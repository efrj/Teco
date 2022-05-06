

$(function(){
    $('#formShortUrl').submit(function(){
        var url = $('#url').val();
        $.ajax({
            method: 'POST',
            url: '/short-url',
            data: { url: url },
            success:function(data) {
                if ( data == 'Not valid' ) {
                    $('.urls ').show();
                    $('.new-url').hide();
                    $('.url-error').show('slow');
                } else {
                    $('.urls ').show();
                    $('.url-error').hide();
                    $('.new-url').show('slow');
                    $('#shortUrl').html(data);
                }
            },
            error: function(data) {
                console.log('data');
            }
        });
        return false;
    });
});