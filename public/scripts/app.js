/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// function to create a new tweet
function createTweetElement(obj){
  // fixes the original time to something users can understand
  let time = moment(obj.created_at).fromNow();

  return $(`
          <article class="tweet-article">
            <header class="tweet-article-header">
              <img class="avatar-img" src="${obj.user.avatars.small}">
              <h3 class="user-name"> ${escape(obj.user.name)}</h3>
              <span class="post-name"> ${escape(obj.user.handle)} </span>
            </header>
            <div class="tweet-article-text">
              <p> ${escape(obj.content.text)} </p>
            </div>
            <footer>
              <span class="date-posted"> ${time} </span>
              <div class="icon-container">
                <img src="/images/flag.png">
                <img src="/images/re-tweet.png">
                <img src="/images/heart.png">
              </div>
            </footer>
          </article>`)
}


// Function to render and sort tweets
function renderTweets(arry){
  // sorts list of tweets
  arry.reverse();
  // iterates through tweets and adds them to tweet container div
  for(let i of arry){
    let $tweet = createTweetElement(i);
    $('#tweets-container').append($tweet);
  }
}

// Function to load tweets from the database
function loadTweets() {
  $.ajax({
    url: '/tweets/',
    method: 'GET',
    success: function (tweets) {
      $('#tweets-container').empty();
      renderTweets(tweets);
    }
  });
}

loadTweets(data);

$(document).ready(function() {

  renderTweets(data);

  // serialize the text from form
  $('#theForm').on('submit', function(ev) {

    ev.preventDefault();
    // Get data from the form
    let formData = $('#theForm').serialize();
    let input = $('.tweet-text').val();

    // if input of user is empty or null return an alert
    if(input === "" || input === null ){
      alert("Please Type Something");
    // if input of user is longer than 140 characters return an alert
    }else if(input.length > 140){
      alert("Too Many Characters");
    // if everything passes then post the tweet and empty the text box
    }else {
    // renderTweets([formData]);
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: formData,
        success: function () {
          loadTweets();
          $('.tweet-text').val("");
        }
      });
    }

  });


  // slide toggle button for showing new tweet section
  $('.slide-button').click(function(){
    $('.new-tweet').slideToggle(300);
    $('.tweet-text').select();
  });

});


// function to pass only safe text
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// when user presses enter on keyboard the tweet gets posted
$(document).ready(function() {
  $('#theForm textarea').keydown(function(event) {
    if (event.keyCode == 13) {
      $(this.form).submit();
      return false;
     }
  });
});