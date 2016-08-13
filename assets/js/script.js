$(function(){
  $button = $('#quote-btn');  // this is the button
  $content = $('#quote-content'); // this selects the result <p>
  $author = $('#quote-person');
  $loader = $('.loader');
  api_url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous"; // this is the url for the api
  $button.on('click', function(){
    $.ajax({
      method: "POST",
      url: api_url,
      headers: {'X-Mashape-Key': 'XVbzZMAWammshmcUgXnY5aZH3mB0p1OkaYEjsndwnwdA0EBE0I',
                'Accept': 'text/plain'},
      dataType: 'json',
      // // show the loader before making the request
      beforeSend: function() {
        $loader.show();
      }
    }).always(alwaysFunction)
      .success(successFunction)
      .fail(failFunction);

  function alwaysFunction(){

  }

  function successFunction(data){
    $loader.hide();
    $content.text(data.quote);
    $author.text(data.author);
  }

  function failFunction(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});
});
