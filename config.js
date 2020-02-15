const refreshInterval = 300000; // by default, bot will query overwatch league api each 10 sec
const channelName = "overwatch-league" // channel in which automatic messages will be sent
const owlStreamLink = "https://www.twitch.tv/overwatchleague_fr"

const dateFormats = [
	{
		name: "Fr",
		offset: 0,
		emojiFlag: ":flag_fr:",
		days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
	},
	{
		name: "Gb",
		offset: -1, // difference of hours between targeted timezone and local timezone
		emojiFlag: ":flag_gb:",
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	}		
	]

module.exports = {
	refreshInterval,
	channelName,
	dateFormats,
	owlStreamLink
}