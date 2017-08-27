//add event listener to the shorten button on click
$('#btn-shorten').on('click', function(){
    //AJAX call to /api/shorten with the URL that the user entered in the input field
    $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data){
            console.log(data)
            //display the shortened URL to the user
            var resultHTML = '<a class="result" target="_blank" href="' + data.shortUrl + '">' + data.shortUrl + '</a>'
            $('#link').html(resultHTML)
        }
    })
})