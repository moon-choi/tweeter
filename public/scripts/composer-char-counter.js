/* eslint-disable no-undef */
$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const $input = $("#tweet-text");
    const userInput = $input.val();
    let quota = 140 - userInput.length;
    document.getElementById("counter").innerHTML = quota;

    if (quota < 0) {
      document.getElementById("counter").style.color = "red";
    } else {
      document.getElementById("counter").style.color = "#7a7770";
    }
  });
});
