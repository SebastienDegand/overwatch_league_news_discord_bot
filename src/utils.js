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
  return fetch('https://api.overwatchleague.com/v2/standings')
      .then(response => response.json())
      .then(data => data.data)
      .then((teams) => {
        return teams.sort(function(team1,team2) {
          return team1.league.placement - team2.league.placement;
        })
      });
}

function getRankedTeamsStage(stageNumber) {
  return fetch('https://api.overwatchleague.com/v2/standings')
      .then(response => response.json())
      .then(data => data.data)
      .then((teams) => {
        return teams.sort(function(team1,team2) {
          return team1.stages['stage' + stageNumber].placement - team2.stages['stage' + stageNumber].placement;
        })
      });
}

module.exports = {
	nextMatchFrom,
  getRankedTeams,
  getRankedTeamsStage
}