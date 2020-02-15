const LOGGER = require('./logger.js');
const config = require('../config.js')
const constants = require('./constants.js')
const service = require('./service.js')
const fs = require('fs');
const Discord = require("discord.js");

try {
    let data = fs.readFileSync('banner.txt', 'utf8');
    console.log(data);   
} catch(e) {
    LOGGER.errorStack('An error occured wile display the banner', e.stack);
    process.exit(-1);
}

LOGGER.info('Starting application ...')

const client = new Discord.Client();

client.on('error', err => {
    LOGGER.errorStack(err, err.stack);
  }
);

client.on('ready', () => {
    LOGGER.info(`Logged in as ${client.user.tag}`);
    let channel = client.channels.find("name", config.channelName);

    setInterval(function () {
        let now = new Date();
        let match = service.getNextMatch(now);
        if(isBetween(match.date - now.getTime(), 0, config.refreshInterval)) {
            LOGGER.info(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} is starting now [date=${match.date}]`)
            channel.send(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} is starting now !`);
        }
        if(isBetween(match.date - 30*60*1000 - now.getTime(), 0, config.refreshInterval)) {
            LOGGER.info(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} starts in 30 minutes [date=${match.date}]`)
            channel.send(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} starts in 30 minutes !`)
        }
    }, config.refreshInterval)
  
    channel.send('Heroes never die !');
  
  }
);

client.on('message', msg => {
    if (msg.content === constants.COMMAND_PREFIX || msg.content === constants.COMMAND_HELP) {
        msg.channel.send(`
        Commands available:
        /owl [command]
        - help
        - ping
        - next-match
        `)
    }

    if (msg.content === constants.COMMAND_PING) {
        msg.channel.send('Pong !')
    }

    if (msg.content === constants.COMMAND_NEXT_MATCH) {
        let match = service.getNextMatch(new Date());
        msg.channel.send(`The next match will oppose ${match.competitors[0].name} and ${match.competitors[1].name} on ${new Date(match.date)}`);
    }
  
    if (msg.content.match(/^ranking stage \d+$/g)) {

    }
  
  
  }
);

service.startCachedMatchesUpdate().then(() => {
    client.login(process.env.BOT_TOKEN).catch((error) => {
        LOGGER.errorStack('An error occured while login', error.stack);
    })
});

function isBetween(number, min, max) {
    return number > min && number < max;
}