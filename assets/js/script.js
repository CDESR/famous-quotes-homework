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



$(function(){
  $weatherButton = $('#sgweather-btn');
  $forecastContent = $('#weather-forecast');
  $loader = $('.loader');

  api2_url = "https://simple-weather.p.mashape.com/weather?lat=1.3521&lng=103.8198";

  $weatherButton.on('click', function(){
    $.ajax({
      method: "GET",
      url: api2_url,
      headers: {'X-Mashape-Key': 'fKNj4SkY1lmshrYv3plHC6jXCNmdp1YPo3XjsnujdpbI1rHohn',
           'Accept': 'text/plain'},
      dataType: 'text',

      beforeSend: function() {
        $loader.show();
      }


    }).success(successFunction)
      .fail(failFunction);

    function successFunction(data){
      $loader.hide();
      $forecastContent.text(data);
    }

    function failFunction(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    }

  });
});


// $(function(){
//   $gerWeatherButton = $('#gerweather-btn');
//   $forecastContent = $('#weather-forecast');
//   api2_url = "https://simple-weather.p.mashape.com/weather?lat=52.5200&lng=13.4050";
//
//   $gerWeatherButton.on('click', function(){
//     $.ajax({
//       method: "GET",
//       url: api2_url,
//       headers: {'X-Mashape-Key': 'fKNj4SkY1lmshrYv3plHC6jXCNmdp1YPo3XjsnujdpbI1rHohn',
//            'Accept': 'text/plain'},
//       dataType: 'text',
//
//
//     }).success(successFunction)
//       .fail(failFunction);
//
//     function successFunction(data){
//       alert(data);
//       $forecastContent.text(data);
//     }
//
//     function failFunction(jqXHR, textStatus, errorThrown){
//       console.log(errorThrown);
//     }
//
//   });
// });
