/* eslint-disable no-undef */

//0.cross-site scripting
const escape = function (str) {
  let p = document.createElement("p"); //create an empty <p> element
  p.appendChild(document.createTextNode(str)); //adding text to the <p> element
  return p.innerHTML; //it only returns of the value inside <p>
};

//1. create
const createTweetElement = function (data) {
  const { user, content, createdAt } = data; //destructuring //
  // we don't have to constantly write data.user.name;
  const tweetsDOM = $(`
    <article class="tweet">
      <div class="tweet-header">
        <div class="header-left">
          <img class="tweet-avatar" src=${user.avatars} alt="avatar" />
          <label class="name-label">${user.name}</label>
   
        </div>

        <div class="header-right">
          <label class="handle-label">${user.handle}</label>
        </div>
      </div>

      <p class="tweet-body">${escape(content.text)}</p>

      <hr class="tweet-line" />

      <div class="tweet-footer">
        <output class="created-at">${timeago.format(createdAt)}</output>
        <div class="article-footer-icons">
          <i class="fa-solid fa-flag fa-xs"></i>
          <i class="fa-solid fa-retweet fa-xs"></i>
          <i class="fa-solid fa-heart fa-xs"></i>
        </div>
      </div>
    </article>
  `);
  // $(".tweets-container").prepend(tweetsDOM);
  return tweetsDOM;
};

//2. render (displaying html but also adding in the data being looped through to the html)
const renderTweets = function (data) {
  $(".tweets-container").empty();
  for (const el of data) {
    //array - each item is an object that contains user, content, createdAt
    $(".tweets-container").prepend(createTweetElement(el)); //el is an object that has 3 contents.
  }
};

//3. load
const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:8081/tweets",
    // success: (response) => {
    //   renderTweets(response);
  }).then((result) => {
    renderTweets(result);
  });
};

$(document).ready(function () {
  // loadTweets(); // load up the existing ones before posting a new tweet.
  $(".error").hide();
  // renderTweets(data); //hardcoded object, testing.
  $("#tweet-form").submit(function (e) {
    e.preventDefault(); //preventing res.status(201).send()
    $(".error").hide();
    if (Number($("#tweet-form").find(".counter").text()) < 0) {
      // return alert("too many characters");
      $("#error-1").slideDown();
    } else if (Number($("#tweet-form").find(".counter").text()) >= 140) {
      // return alert("type something!");
      $("#error-2").slideDown();
    } else {
      const result = $("#tweet-text").serialize(); //textarea=whatever&xyz
      $.ajax({
        type: "POST",
        url: "http://localhost:8081/tweets",
        data: result,
      }).then(() => {
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets();
      });
    }

    // have to reset inside .submit because evertime we trigger 'submit' we want this to be cleared. if I do it outside submit, it won't run.
  });
  loadTweets();
});

// Questions - Mentor: Reinhardt Cagara
/*
1a. $.ajax blah
1b. $.get..blah  -- wrapper for ajax specifically for get call.
2. .done (new) / .then (older)
*/
