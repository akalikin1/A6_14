const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misses = 0;
let totalshots = 0;
let totalscore = 0;
let hitrate = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("#gameplate").hide();
  $("#button-startgame").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#totalshots").text(totalshots);
  $("#misses").text(misses);
  $("#totalscore").text(maxHits - misses);
  hitrate = (maxHits / totalshots * 100).toFixed(2)
  $("#hitrate").text(hitrate);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  $(event.target).text("");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    totalshots = totalshots + 1;
    $(event.target).removeClass("target");
    $('[id^="slot-"]').removeClass("miss");
    round();
  }
  else {
    $(event.target).addClass("miss");
    misses = misses + 1;
    totalshots = totalshots + 1;
  } 
}

function init() {
  
  $("#button-startgame").click(function() {
    round();
    firstHitTime = getTimestamp();
    $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
