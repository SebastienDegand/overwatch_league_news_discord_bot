const refreshIntervalFromServer = 300000; // by default, bot will fetch matches each 5 minutes
const refreshInterval = 10000; // by default, bot will check the next match each 10 seconds
const channelName = "test" // channel in which automatic messages will be sent

const teamsColors = {
    "Atlanta Reign": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/32/32MTX0PLEDY31542673991836.png",
        "backgroundColor": "#C4C4C4",
        "textColor": "#333333",
        "website": "https://reign.overwatchleague.com",
        "divisionId": 79
    },
    "Boston Uprising": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/8RS25ECY3PZH1515523733716.png",
        "backgroundColor": "#174B97",
        "textColor": "#ffffff",
        "website": "https://uprising.overwatchleague.com",
        "divisionId": 79
    },
    "Chengdu Hunters": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/st/STKSER89UHKO1542674031469.png",
        "backgroundColor": "#FFA000",
        "textColor": "#333333",
        "website": "https://hunters.overwatchleague.cn",
        "divisionId": 80
    },
    "Dallas Fuel": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/NO44N7DDJAPF1508792362936.png",
        "backgroundColor": "#032340",
        "textColor": "#ffffff",
        "website": "https://fuel.overwatchleague.com",
        "divisionId": 80
    },
    "Florida Mayhem": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/ZZIV9VLD5UO21512520986438.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://mayhem.overwatchleague.com",
        "divisionId": 79
    },
    "Guangzhou Charge": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/sz/SZQVDGE3F1TE1542674048320.png",
        "backgroundColor": "#122C42",
        "textColor": "#ffffff",
        "website": "https://charge.overwatchleague.cn",
        "divisionId": 80
    },
    "Hangzhou Spark": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/TJ9I5I8BFC5J1542674380020.png",
        "backgroundColor": "#FB7299",
        "textColor": "#333333",
        "website": "https://spark.overwatchleague.cn",
        "divisionId": 80
    },
    "Houston Outlaws": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/gallery/46H5JPPV59Z51546557672375.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://outlaws.overwatchleague.com",
        "divisionId": 79
    },
    "London Spitfire": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/NW461AQIYQMK1508792363133.png",
        "backgroundColor": "#59CBE8",
        "textColor": "#333333",
        "website": "https://spitfire.overwatchleague.com",
        "divisionId": 79
    },
    "Los Angeles Gladiators": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/01NO2I1B84CF1512520986350.png",
        "backgroundColor": "#3C1053",
        "textColor": "#ffffff",
        "website": "https://gladiators.overwatchleague.com",
        "divisionId": 80
    },
    "Los Angeles Valiant": {
        "logo": "https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blta03a226e8c5d90d5/5e14d2882a6ac40d0b660935/OWL_LAValiant_Icon_2020_PNG.png",
        "backgroundColor": "#1888C6",
        "textColor": "#ffffff",
        "website": "https://valiant.overwatchleague.com",
        "divisionId": 80
    },
    "New York Excelsior": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/9r/9RYLM8FICLJ01508818792450.png",
        "backgroundColor": "#171C38",
        "textColor": "#ffffff",
        "website": "https://excelsior.overwatchleague.com",
        "divisionId": 79
    },
    "Paris Eternal": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/qm/QM7JE0THABVT1542674071412.png",
        "backgroundColor": "#303D56",
        "textColor": "#ffffff",
        "website": "https://eternal.overwatchleague.com",
        "divisionId": 79
    },
    "Philadelphia Fusion": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/gallery/BI9AZG2WTOCE1544642967810.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://fusion.overwatchleague.com",
        "divisionId": 79
    },
    "San Francisco Shock": {
        "logo": "https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blte679a761205b5d5f/5e1763e38691147ecf07e0f6/OWL_SFShock_Icon_1C_SILVER-01.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://shock.overwatchleague.com",
        "divisionId": 80
    },
    "Seoul Dynasty": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/LHRSIW3NWH211508792362796.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://dynasty.overwatchleague.com",
        "divisionId": 80
    },
    "Shanghai Dragons": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/F7T6ISEVW0NN1512520986578.png",
        "backgroundColor": "#D22630",
        "textColor": "#ffffff",
        "website": "https://dragons.overwatchleague.cn",
        "divisionId": 80
    },
    "Toronto Defiant": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/H8QUA3VTDY391542674380168.png",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "website": "https://defiant.overwatchleague.com",
        "divisionId": 79
    },
    "Vancouver Titans": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/gallery/K4OO4HAOUWWH1543976763453.png",
        "backgroundColor": "#09226B",
        "textColor": "#ffffff",
        "website": "https://titans.overwatchleague.com",
        "divisionId": 80
    },
    "Washington Justice": {
        "logo": "https://bnetcmsus-a.akamaihd.net/cms/gallery/5PJ70D8IZIYS1543975994431.png",
        "backgroundColor": "#990034",
        "textColor": "#ffffff",
        "website": "https://justice.overwatchleague.com",
        "divisionId": 79
    }
}

module.exports = {
	refreshIntervalFromServer,
	refreshInterval,
	channelName,
	teamsColors
}