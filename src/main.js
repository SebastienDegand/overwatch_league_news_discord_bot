const LOGGER = require('./logger.js');
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
    let channel = client.channels.find("name", 'test');
  
    channel.send('Heroes never die !');
  
  }
);

client.on('message', msg => {
    if (msg.content === constants.COMMAND_PING) {
        msg.channel.send('Pong !')
        console.log(service.getNextMatch())
    }

    if (msg.content === constants.COMMAND_NEXT_MATCH) {
        msg.channel.send('next !');
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