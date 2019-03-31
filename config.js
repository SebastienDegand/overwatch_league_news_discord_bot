const refreshInterval = 10000; // by default, bot will query overwatch league api each 10 sec
const channelName = "overwatch-league"

const dateFormats = [
	{
		name: "Fr",
		offset: 0,
		emojiFlag: ":flag_fr:",
		days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
		months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
	},
	{
		name: "Gb",
		offset: -1,
		emojiFlag: ":flag_gb:",
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	}		
	]

module.exports = {
	refreshInterval,
	channelName,
	dateFormats
}