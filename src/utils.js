const fetch = require("node-fetch");

function nextMatchFrom(date) {
	return fetch('https://api.overwatchleague.com/schedule')
      .then(response => response.json())
      .then(data => {
        var nextMatch;
        var minDiffTime = Infinity;
        data.data.stages.forEach((stage) => {
          stage.matches.forEach((match) => {
            var diffTime = match.startDateTS - date.getTime();
            if( diffTime > 0 && diffTime < minDiffTime) {
              minDiffTime = diffTime;
              nextMatch = match;
            }
          })
        })
        return nextMatch;
       })
}

function getRankedTeams() {
  return fetch('https://api.overwatchleague.com/ranking')
      .then(response => response.json())
      .then(data => data.content)
}

module.exports = {
	nextMatchFrom,
  getRankedTeams
}