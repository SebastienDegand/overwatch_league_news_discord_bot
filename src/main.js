const LOGGER = require('./logger.js');
const config = require('../config.js')
const constants = require('./constants.js')
const service = require('./service.js')
const imageService = require('./imageService.js')
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
    LOGGER.info(`Use channel '${config.channelName}'`);

    setInterval(function () {
        let now = new Date();
        let match = service.getNextMatch(now);
        if (match) {
            if (isBetween(match.date - now.getTime(), 0, config.refreshInterval)) {
                LOGGER.info(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} is starting now [date=${match.date}]`)
                imageService.generateImage(match.competitors[0].logoUrl, match.competitors[1].logoUrl, match.competitors[0].name, match.competitors[1].name, 'The match is starting now !')
                .then(buffer => {
                    channel.send({
                        files: [{
                            attachment: buffer,
                            name: 'next-match.png'
                        }]
                    })
                })
            }
            if (isBetween(match.date - 30*60*1000 - now.getTime(), 0, config.refreshInterval)) {
                LOGGER.info(`The match opposing ${match.competitors[0].name} and ${match.competitors[1].name} starts in 30 minutes [date=${match.date}]`)
                imageService.generateImage(match.competitors[0].logoUrl, match.competitors[1].logoUrl, match.competitors[0].name, match.competitors[1].name, 'The match starts in 30 minutes !')
                .then(buffer => {
                    channel.send({
                        files: [{
                            attachment: buffer,
                            name: 'next-match.png'
                        }]
                    })
                })
            }
        }
    }, config.refreshInterval)
  
    channel.send('Heroes never die !');
  
  }
);

client.on('message', msg => {
    if (msg.content === constants.COMMAND_PREFIX || msg.content === constants.COMMAND_HELP) {
        LOGGER.info(`${msg}`);
        msg.channel.send(`
        Commands available:
        /owl [command]
        - help
        - ping
        - next-match
        `)
    }

    if (msg.content === constants.COMMAND_PING) {
        LOGGER.info(`${msg}`);
        msg.channel.send('Pong !')
    }

    if (msg.content === constants.COMMAND_NEXT_MATCH) {
        LOGGER.info(`${msg}`);
        let match = service.getNextMatch(new Date());
        if(match) {
            imageService.generateImage(match.competitors[0].logoUrl, match.competitors[1].logoUrl, match.competitors[0].name, match.competitors[1].name, new Date(match.date).toString())
                .then(buffer => {
                    msg.channel.send({
                        files: [{
                            attachment: buffer,
                            name: 'next-match.png'
                        }]
                    })
                })
        } else {
            msg.channel.send('No next match found');
        }
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