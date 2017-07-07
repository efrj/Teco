

$(function(){
    $('#formShortUrl').submit(function(){
        var url = $('#url').val();
        $.ajax({
            method: 'POST',
            url: '/short-url',
            data: { url: url },
            success:function(data) {
                if ( data == 'Not valid' ) {
                    $('.new-url').hide();
                    $('.url-error').show('slow');
                } else {
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