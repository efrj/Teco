# Teco — Encurtador de URLs

[![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Slim](https://img.shields.io/badge/Slim-3.x-9013FE)](https://www.slimframework.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)

Encurtador de URLs simples, rápido e elegante desenvolvido em **PHP** com o micro-framework **Slim**, persistência via **Eloquent ORM** (Illuminate Database) e banco de dados **SQLite**.

A interface é construída com **Bootstrap 5** e estilização moderna (dark mode, glassmorphism e micro-animações), com **zero dependência de CDNs externas** — todos os assets são gerenciados via **npm** e servidos localmente.

---

## ✨ Funcionalidades

- **Encurtamento Instantâneo**: Gera URLs curtas de 6 caracteres alfanuméricos aleatórios.
- **Interface Moderna**: Design escuro em glassmorphism, responsivo e com feedback visual instantâneo.
- **Cópia em 1 Clique**: Botão com ação de cópia para a área de transferência (`Clipboard API`).
- **Histórico Local**: Salva as últimas URLs encurtadas no navegador (`localStorage`) com ações de cópia e acesso rápido.
- **100% Offline / Sem CDN**: Todos os assets CSS/JS (Bootstrap 5, Bootstrap Icons) são locais.
- **Docker Ready**: Ambiente pronto para desenvolvimento e execução com Docker Compose.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: PHP 8.4 + Apache (com `mod_rewrite`)
- **Framework**: Slim Framework 3
- **ORM / Persistência**: Eloquent ORM (`illuminate/database`)
- **Banco de Dados**: SQLite (`teco.db`)
- **Frontend**: HTML5, Vanilla JavaScript, CSS3
- **UI Framework & Ícones**: Bootstrap 5.3.3 + Bootstrap Icons 1.11.3 (gerenciados via npm)
- **Containerização**: Docker e Docker Compose

---

## 📁 Estrutura do Projeto

```text
.
├── infra/
│   ├── Dockerfile              # Imagem PHP 8.4 Apache + Composer
│   └── docker-compose.yaml     # Orquestração dos containers (PHP + MariaDB)
├── package.json                # Gerenciador de dependências frontend (Bootstrap 5, Icons)
├── scripts/
│   └── copy-assets.mjs         # Script para distribuição dos assets em www/assets/vendor
├── www/
│   ├── .htaccess               # Reescrita de URLs para index.php
│   ├── index.php               # Front controller e inicialização do Slim/Eloquent
│   ├── assets/
│   │   ├── css/main.css        # Estilos customizados (dark glassmorphic theme)
│   │   ├── js/main.js          # Lógica frontend (fetch, clipboard, history)
│   │   └── vendor/             # Assets compilados do Bootstrap e Bootstrap Icons
│   └── app/
│       ├── composer.json       # Dependências backend
│       ├── db/teco.db          # Banco de dados SQLite
│       ├── src/                # Rotas, Models e Helpers
│       └── templates/          # Template index.phtml
└── README.md
```

---

## 🚀 Como Executar

### 1. Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### 2. Iniciar os Containers
Na raiz do projeto, execute:

```bash
docker compose -f infra/docker-compose.yaml up -d --build
```

A aplicação estará disponível em:
👉 **[http://localhost:8123](http://localhost:8123)**

### 3. Instalar Dependências PHP (caso necessário)
Se for a primeira execução e a pasta `vendor/` não existir:

```bash
docker exec php.teco composer install -d /var/www/html/app
```

---

## 📦 Gerenciamento de Assets Frontend

Os assets do frontend (Bootstrap e ícones) são gerenciados via npm sem recorrer a CDNs:

```bash
# Instalar pacotes npm e compilar para www/assets/vendor
npm install
npm run build
```

---

## 🔌 Endpoints da Aplicação

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Página inicial com a interface de encurtamento. |
| `POST` | `/short-url` | Encurta uma URL (campo `url`). Retorna a URL curta ou `Not valid`. |
| `GET` | `/{url}` | Redireciona o código curto para a URL original de destino. |

---

## 📄 Licença

Distribuído sob a licença [GPL-3.0](LICENSE).
