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
        }, config.refreshIntervalFromServer);
    }).catch(error => {
        LOGGER.errorStack('An error occured while getting matches', error.stack)
        // if we can't retrieve matches the first time, exit.
        process.exit(-1);
    });
}

function getNextMatch(date) {
    let matchesAfter = cachedMatches.filter(match => new Date(match.date) > date)
    if(matchesAfter.length > 0) {
        return matchesAfter.reduce(function(match1, match2) { return match1.date < match2.date ? match1 : match2; });
    } else {
        // no match found after the date
        return undefined;
    }
}

module.exports = {
    startCachedMatchesUpdate,
    getNextMatch
}