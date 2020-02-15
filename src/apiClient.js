const LOGGER = require('./logger.js');
const fetch = require("node-fetch");

const url = 'https://wzavfvwgfk.execute-api.us-east-2.amazonaws.com/production/owl/paginator/schedule';

async function getMatches() {
    LOGGER.info('Getting matches ...');
    let matches = [];

    let nbPages = await getNumberPages();
    
    let promises = [];
    for(let page = 1; page<= nbPages; page++) {
        let promise = getMatchesFromPage(page).then(homestands => {
            homestands.forEach(homestand => {
                homestand.matches.forEach(match => {
                    matches.push(convertToLocalObject(match));
                })
            });
        });
        promises.push(promise);
    }
    await Promise.all(promises);
    LOGGER.info('Matches retrieved');
    
    return matches;
}

function convertToLocalObject(match) {
    return {
        date: match.startDate,
        competitors: [
            {
                name: match.competitors[0].name,
                logoUrl: match.competitors[0].logo
            },
            {
                name: match.competitors[1].name,
                logoUrl: match.competitors[1].logo
            }
        ]
    }
}

function getMatchesFromPage(page) {
    return fetch(`${url}?stage=regular_season&season=2020&locale=en-us&page=${page}`, {
        headers: {
            'Referer': 'https://overwatchleague.com/' 
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        return json.content.tableData.events;
    })
}

async function getNumberPages() {
    let response = await fetch(`${url}?stage=regular_season&season=2020`, {
        headers: {
            'Referer': 'https://overwatchleague.com/' 
        }
    });

    let json = await response.json();
    return json.content.tableData.pagination.totalPages;
}

module.exports = {
    getMatches
}