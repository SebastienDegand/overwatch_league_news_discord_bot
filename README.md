# Overwatch League News Discord Bot

The goal of this Discord bot is to post messages on your Discord channel about Overwatch League information.

## Features

- Type `ranking`: It shows the actual rank of teams with the number of matches won, lost and played.
- Type `next match`: It shows the next match with team names and dates (local timezone).
- The bot post automatically a message when a match will start in 30 minutes.
- The bot post automatically a message when a match is starting.

## Requirements

This project requires Node.js  
https://nodejs.org/en/

You also need to create an application and a bot on https://discordapp.com/developers  
Join the bot on your server

Emoji for each teams are used, so you need to add an emoji for each team on your server. Emoji name is the last word of the team name. For example the emoji name of team "Paris Eternal" is `:Eternal:`.
You also need to add an `:overwatch:` emoji.

## Installation

First, configure the bot with `config.js` file.  
`dateFormats` array contains all different timezone you want to show. `offset` represent the difference between the targeted timezone and your local timezone.

### Run locally

install dependencies:
`npm install`

the bot token related to yout bot application is required.

Solution 1:
- setup the environnement variable `BOT_TOKEN` with your token
- then start bot using: `npm start`

Solution 2:
- start bot using: `BOT_TOKEN=<your_token> npm start`

## Materials
To do this bot I used:
- the node module Discord.js https://discord.js.org/
- the Overwatch League API https://api.overwatchleague.com/
