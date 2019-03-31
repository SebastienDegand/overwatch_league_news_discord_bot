# Overwatch League News Discord Bot

The goal of this Discord bot is to post messages on your Discord channel about Overwatch League information.

## Features

- Type `ranking`: It shows the actual rank of teams with the number of matches won, lost and played.
- Type `next match`: It shows the next match with team names and date (French timezone).
- The bot post automatically a message when a match will start in 30 minutes.
- The bot post automatically a message when a match is starting.

## Requirements

This project requires Node.js  
https://nodejs.org/en/

You also need to create an application and a bot on https://discordapp.com/developers  
Join the bot on your server

## Installation

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
