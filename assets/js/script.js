$(function(){
  $button = $('#quote-btn');  // this is the button
  $content = $('#quote-content'); // this selects the result <p>
  $author = $('#quote-person');
  $loader = $('.loader');
  $wikiResult = $('.wiki-container');
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

  function failFunction(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }

  function successFunction(data){
    $loader.hide();
    $content.text(data.quote);
    $author.text(data.author);

    /* ----- When success, request from WIKI API ----- */
    $.ajax({
      method:   "POST",
      //add ?calback=? to resolve jsonp dataType issue
      url:      "https://en.wikipedia.org/w/api.php?callback=?",
      headers:  { 'Api-User-Agent': 'Example/1.0' },
      dataType: 'json',
      data:     {
                  format:     "json",
                  action:     "query",
                  prop:       "revisions",
                  rvprop:     "content",
                  rvsection:  "0",
                  rvparse:    "",
                  redirects:  "",
                  titles:     data.author
                }
    }).success(getWiki)
      .fail(failWiki);

    function getWiki(data) {
      //console.log(data.query.pages);
      var pages = data.query.pages,
          getID = Object.keys(pages),
          content = pages[getID].revisions[0]['*'];
          //str = content.split('<p>');
      //console.log(pages[getID].revisions[0]['*']);
      $wikiResult.html(content);
    }

    function failWiki(req, textStatus, errorThrown) {
      console.log(errorThrown);
      $wikiResult.html('No records in Wikipedia');
    }
  } // end of quote success function


});
});
