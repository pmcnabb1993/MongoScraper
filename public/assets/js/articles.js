$(document).ready(function(){

  // get headlines saved to db already
  $.getJSON('/headlines', function(data) {
    displayResults(data);
  })

  // scrape new headlines
  $('.scrape').click(function(event) {
    event.preventDefault();
    $.get('/scrape', function(data){
      alert(data)
      location.reload();
    })
  });

  // route home
  $('.home').click(function(event) {

    $(this).css({
      background: 'grey'
    })
    $('.saved').css({
      background: 'none'
    })

    $('.scrape').show();

    // get headlines from mongo
    $.getJSON('/headlines', function(data) {
      displayResults(data);
    })

  })
  
  // function to display results of Headlines
  function displayResults(data) {
    $('.article-container').html(data.map(headline => `
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3><a class="article-link" target="_blank" href="${headline.link}">${headline.title}</a><a class="btn btn-success save" id="${headline._id}">SAVE ARTICLE</a></h3>
        </div>
        <div class="panel-body">
          ${headline.source}
        </div>
      </div>`
    ))
  }

  // save headlines
  $(document).on('click', '.save', function() {

    var thisId = $(this).attr("id");

    $.ajax({
      method: "PUT",
      url: '/headlines/' + thisId,
      data: {saved: true}
    })
    .then(function(data) {

      $.getJSON('/headlines', function(data) {
        displayResults(data);
      })

    });

  })

});