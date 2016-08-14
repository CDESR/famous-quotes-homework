$(function(){
  $button = $('#quote-btn');  // this is the button
  $content = $('#quote-content'); // this selects the result <p>
  $author = $('#quote-person');
  $loader = $('.loader');
  $quotedByAuthor = $('.quoted-by')
  $quotedByImage = $('.quoted-by-image-container');
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

    var authorQuote = data.author;
    var author_arr = [];
    var author_name_url = "";

    // function to change the name into a format that can be used as a URL to the wiki page
    function buildAuthorName() {
      author_arr = authorQuote.split(' ');
      for (var i = 0; i < author_arr.length - 1; i++) {
        author_name_url += author_arr[i] + '%20';
      }
      author_name_url += author_arr[author_arr.length-1];
    }
    buildAuthorName();
    console.log(author_name_url);
    $author.text(authorQuote);

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
                  prop:       "extracts|pageimages",
                                explaintext: true,
                                exintro: true, //just get the intro section of wiki
                                exchars: 800, // only 800 characters
                                piprop: 'thumbnail',
                                pithumbsize: 300,
                  titles:     authorQuote
                }
    }).success(getWiki)
      .fail(failWiki);

    function getWiki(data) {
      var pages = data.query.pages,
          getID = Object.keys(pages),
          content = pages[getID].extract;

      if (content && content.length > 0) {
        console.log(data);
        $quotedByAuthor.text(authorQuote);
        $quotedByImage.html('<img src="' + pages[getID].thumbnail.source + '" alt="" />');
        var more_link = 'http://en.wikipedia.org/wiki/' + author_name_url;
        $wikiResult.html(content + '<a href="' +  more_link + '" target= "_blank">(read more)</a>');
      }else{
        $wikiResult.html("");
        $quotedByImage.html('');
      }

    }

    function failWiki(req, textStatus, errorThrown) {
      console.log(errorThrown);
      $wikiResult.html('No records in Wikipedia');
    }
  } // end of quote success function


});
});
