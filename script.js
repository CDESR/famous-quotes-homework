$(function(){
  $button = $('#quote-now');  // this is the button
  $content = $('#quote-content'); // this selects the result <p>
  api_url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous"; // this is the url for the api
  $button.on('click', function(){
    $.ajax({
      // put the necessary code here to hit the api
    }).always(alwaysFunction)
      .success(successFunction)
      .fail(failFunction);

  function alwaysFunction(){
    console.log("yay!");
    // do we need this? if not take it out
  }

  function successFunction(data){
    // put the action to show the quote and the person who said the quote in the $result
    // we can have this do some changes to the styling to (eg make the container for the result appear only when success)
  }

  function failFunction(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
  })
})
