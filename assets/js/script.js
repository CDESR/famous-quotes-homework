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
    var author_name = data.author;
    $author.text(author_name);
    var author_name_url = "";


    function buildAuthorName() {
      author_arr = author_name.split(' ');
      for (var i = 0; i < author_arr.length - 1; i++) {
        author_name_url += author_arr[i] + '+';
      }
      author_name_url += author_arr[author_arr.length-1];
    }
    buildAuthorName();
    var wiki_url = "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts&titles=" + author_name_url + "&exintro=1&explaintext=1";

    $.ajax({
      method: "GET",
      url: wiki_url,
      dataType: 'jsonp',
    }).success(successFunction)
      .fail(failFunction);

    function successFunction(data) {
      var prop = Object.keys(data.query.pages);
      console.log(data);
      console.log(prop);
      var wiki_extract = data.query.pages[prop[0]]['extract'];
      console.log(wiki_extract);

      if (wiki_extract.length <= 0) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': author_name
                }
        }).success(successFunction);

        function successFunction(data) {
          console.log(data);
        }
      }


    }
  }


  function failFunction(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});
});
