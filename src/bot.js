const Discord = require("discord.js");
const fetch = require("node-fetch");

const config = require("../config")
const utils = require("./utils.js")

const client = new Discord.Client();

const refreshInterval = config.refreshInterval;
var channel;

client.on('error', err => {
  console.error(err);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  channel = client.channels.find("name", config.channelName);

  channel.send('Heroes never die !');

  setInterval(function() {
    var now = new Date(Date.now());
    utils.nextMatchFrom(now).then((nextMatch) => {
      var diffTime = nextMatch.startDateTS - now.getTime();
      if(diffTime <= refreshInterval && diffTime > 0) {
        var emojiTeam1 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[0].name.split(' ')[nextMatch.competitors[0].name.split(' ').length-1]);
        var emojiTeam2 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[1].name.split(' ')[nextMatch.competitors[1].name.split(' ').length-1]);
        var msg = "`The next match is starting now !`\n";
        msg += emojiTeam1 + "`" + nextMatch.competitors[0].name + " vs " + nextMatch.competitors[1].name + "`" + emojiTeam2 + "\n";
        msg += "==> <https://www.twitch.tv/overwatchleague_fr>\n";
        channel.send(msg);
      }
      now.setMinutes(now.getMinutes() + 30);
      var diffTime = nextMatch.startDateTS - now.getTime();
      if(diffTime <= refreshInterval && diffTime > 0) {
        var emojiTeam1 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[0].name.split(' ')[nextMatch.competitors[0].name.split(' ').length-1]);
        var emojiTeam2 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[1].name.split(' ')[nextMatch.competitors[1].name.split(' ').length-1]);
        var msg = "`The next match will start in 30 minutes !`\n";
        msg += emojiTeam1 + "`" + nextMatch.competitors[0].name + " vs " + nextMatch.competitors[1].name + "`" + emojiTeam2 + "\n";
        msg += "==> <https://www.twitch.tv/overwatchleague_fr>\n";
        channel.send(msg);
      }
    })
  }, refreshInterval)
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('Pong!\nPong!\nPong!')
  }

  if (msg.content === 'ranking') {
  		utils.getRankedTeams().then(teams => {
        var overwatchEmoji = client.emojis.find(emoji => emoji.name === "overwatch");
  			var rankingMsg = "`.".padEnd(3) + ": `" + overwatchEmoji + '`|'.padEnd(32) + "|".padEnd(5) + "V P J` \n";

  			teams.forEach((team) => {
  				var teamName = team.competitor.name;
  				var emoji = client.emojis.find(emoji => emoji.name === teamName.split(' ')[teamName.split(' ').length-1]);
          var vdn = team.records[0].matchWin + " " + team.records[0].matchLoss + " " + (team.records[0].matchWin + team.records[0].matchLoss);

  				rankingMsg += "`" + team.placement.toString().padEnd(2) + ": `" + emoji + "`|" + teamName.padEnd(25).padStart(30) + "|".padEnd(5) + vdn + "` \n"
  			})
  			return rankingMsg;
  		})
  		.then(ranking => msg.channel.send(ranking));
  }

  if(msg.content === 'next match') {
    var now = new Date(Date.now())
    utils.nextMatchFrom(now).then((nextMatch) => {
      var emojiTeam1 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[0].name.split(' ')[nextMatch.competitors[0].name.split(' ').length-1]);
      var emojiTeam2 = client.emojis.find(emoji => emoji.name === nextMatch.competitors[1].name.split(' ')[nextMatch.competitors[1].name.split(' ').length-1]);

      var nextMatchMsg = "`Next Match :`\n"
      nextMatchMsg += emojiTeam1 + "`" + nextMatch.competitors[0].name + " vs " + nextMatch.competitors[1].name + "`" + emojiTeam2 + "\n";

      config.dateFormats.forEach((dateFormat) => {
        var dateMatch = new Date(nextMatch.startDateTS);
        dateMatch.setHours(dateMatch.getHours() + dateFormat.offset);
        nextMatchMsg += dateFormat.emojiFlag + "`" + dateFormat.days[dateMatch.getDay()-1] + " " + dateMatch.getDate() + " " + dateFormat.months[dateMatch.getMonth()] + " " + dateMatch.getFullYear() + " " + String(dateMatch.getHours()).padStart(2, '0') + ":" + String(dateMatch.getMinutes()).padStart(2, '0') + ":" + String(dateMatch.getSeconds()).padStart(2, '0') + "`\n";
      })
      nextMatchMsg += "==> <" + config.owlStreamLink + ">\n"
      return nextMatchMsg;
    })
    .then(nextMatchMsg => msg.channel.send(nextMatchMsg))
  }
});

client.login(process.env.BOT_TOKEN);