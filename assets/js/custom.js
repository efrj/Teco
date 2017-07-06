

$(function(){
    $('#formShortUrl').submit(function(){
        var url = $('#url').val();
        $.ajax({
            method: 'POST',
            url: '/short-url',
            data: { url: url },
            success:function(data) {
                $('.new-url').show('slow');
                $('#shortUrl').html(data);
            },
            error: function(data) {
                console.log('data');
            }
        });
        return false;
    });
});