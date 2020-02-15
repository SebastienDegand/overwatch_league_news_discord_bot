const LOGGER = require('./logger.js')
const client = require('./apiClient.js')
const config = require('../config.js')

let cachedMatches = [];

function updateCachedMatches() {
    return client.getMatches().then(matches => {
        cachedMatches = matches;
    })
}

function startCachedMatchesUpdate() {
    return updateCachedMatches().then(() => {
        setInterval(function() {
            updateCachedMatches().catch(error => {
                LOGGER.errorStack('An error occured while getting matches', error.stack)
            })
        }, config.refreshInterval);
    }).catch(error => {
        LOGGER.errorStack('An error occured while getting matches', error.stack)
        process.exit(-1);
        // if we can't retrieve matches the first time, exit.
    });
}

function getNextMatch() {
    let now = new Date();
    matchesAfter = cachedMatches.filter(match => new Date(match.date) > now)
    return matchesAfter.reduce(function(match1, match2) { return match1.date < match2.date ? match1 : match2; });
}

module.exports = {
    startCachedMatchesUpdate,
    getNextMatch
}