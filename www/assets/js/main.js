document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formShortUrl');
  const urlInput = document.getElementById('url');
  const submitBtn = document.getElementById('submitBtn');
  const resultBox = document.getElementById('resultBox');
  const errorBox = document.getElementById('errorBox');
  const shortUrlText = document.getElementById('shortUrlText');
  const copyBtn = document.getElementById('copyBtn');
  const openLink = document.getElementById('openLink');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  // Load history on start
  loadHistory();

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawUrl = urlInput.value.trim();
    if (!rawUrl) return;

    // Set loading state
    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Encurtando...';
    hideError();
    hideResult();

    try {
      const bodyParams = new URLSearchParams();
      bodyParams.append('url', rawUrl);

      const response = await fetch('/short-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: bodyParams.toString()
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
      }

      const responseText = (await response.text()).trim();

      if (responseText === 'Not valid') {
        showError('A URL informada é inválida. Por favor, verifique e tente novamente.');
      } else {
        // Build full URL
        let fullShortUrl = responseText;
        if (!fullShortUrl.startsWith('http://') && !fullShortUrl.startsWith('https://')) {
          fullShortUrl = window.location.protocol + '//' + fullShortUrl;
        }

        showResult(fullShortUrl, rawUrl);
        saveToHistory(rawUrl, fullShortUrl);
      }
    } catch (err) {
      console.error(err);
      showError('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });

  // Copy to clipboard
  copyBtn.addEventListener('click', async () => {
    const textToCopy = shortUrlText.textContent.trim();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copiado!';
      copyBtn.classList.remove('btn-action-copy');
      copyBtn.classList.add('btn-success');

      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.classList.remove('btn-success');
        copyBtn.classList.add('btn-action-copy');
      }, 2000);
    } catch (err) {
      // Fallback
      fallbackCopy(textToCopy);
    }
  });

  // Clear history
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      localStorage.removeItem('teco_history');
      renderHistory([]);
    });
  }

  function showResult(shortUrl, originalUrl) {
    shortUrlText.textContent = shortUrl;
    openLink.href = shortUrl;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideResult() {
    resultBox.style.display = 'none';
  }

  function showError(msg) {
    const errorMsgEl = document.getElementById('errorMessage');
    if (errorMsgEl) errorMsgEl.textContent = msg;
    errorBox.style.display = 'block';
  }

  function hideError() {
    errorBox.style.display = 'none';
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copiado!';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
    }, 2000);
  }

  // LocalStorage History Helpers
  function getHistory() {
    try {
      const items = localStorage.getItem('teco_history');
      return items ? JSON.parse(items) : [];
    } catch (e) {
      return [];
    }
  }

  function saveToHistory(originalUrl, shortUrl) {
    let history = getHistory();
    // Prepend new item and keep max 10
    history = [{
      original: originalUrl,
      short: shortUrl,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }, ...history.filter(item => item.short !== shortUrl)].slice(0, 10);

    localStorage.setItem('teco_history', JSON.stringify(history));
    renderHistory(history);
  }

  function loadHistory() {
    const history = getHistory();
    renderHistory(history);
  }

  function renderHistory(history) {
    if (!historySection || !historyList) return;

    if (history.length === 0) {
      historySection.style.display = 'none';
      historyList.innerHTML = '';
      return;
    }

    historySection.style.display = 'block';
    historyList.innerHTML = history.map((item) => `
      <div class="history-item">
        <div class="d-flex flex-column text-truncate" style="min-width: 0;">
          <a href="${item.short}" target="_blank" class="history-short text-decoration-none">
            <i class="bi bi-link-45deg"></i> ${item.short}
          </a>
          <span class="history-original" title="${item.original}">
            <i class="bi bi-arrow-return-right"></i> ${item.original}
          </span>
        </div>
        <div class="d-flex align-items-center gap-2 flex-shrink-0">
          <span class="badge bg-secondary-subtle text-secondary small">${item.date || ''}</span>
          <button class="btn btn-sm btn-outline-light copy-item-btn" data-url="${item.short}" title="Copiar">
            <i class="bi bi-clipboard"></i>
          </button>
          <a href="${item.short}" target="_blank" class="btn btn-sm btn-outline-primary" title="Abrir">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
      </div>
    `).join('');

    // Attach copy handlers to items
    historyList.querySelectorAll('.copy-item-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          try {
            await navigator.clipboard.writeText(url);
            btn.innerHTML = '<i class="bi bi-check-lg text-success"></i>';
            setTimeout(() => {
              btn.innerHTML = '<i class="bi bi-clipboard"></i>';
            }, 1500);
          } catch (e) {
            fallbackCopy(url);
          }
        }
      });
    });
  }
});