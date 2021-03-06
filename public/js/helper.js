const Handlebars = require('handlebars');

var groupeNames = {
    '793': 'GROUP A',
    '794': 'GROUP B',
    '795': 'GROUP C',
    '796': 'GROUP D',
    '797': 'GROUP E',
    '798': 'GROUP F',
    '799': 'GROUP G',
    '800': 'GROUP H',
};

var teamAbbr = {
    'Argentina': 'arg',
    'Australia': 'aus',
    'Belgium': 'bel',
    'Brazil': 'bra',
    'Colombia': 'col',
    'Costa Rica': 'crc',
    'Croatia': 'cro',
    'Denmark': 'den',
    'Egypt': 'egy',
    'England': 'eng',
    'France': 'fra',
    'Germany': 'ger',
    'Iceland': 'isl',
    'Iran': 'irn',
    'Japan': 'jpn',
    'Korea Republic': 'kor',
    'South Korea': 'kor',
    'Mexico': 'mex',
    'Morroco': 'mar',
    'Morocco': 'mar',
    'Nigeria': 'nga',
    'Panama': 'pan',
    'Peru': 'per',
    'Poland': 'pol',
    'Portugal': 'por',
    'Russia': 'rus',
    'Saudi Arabia': 'ksa',
    'Senegal': 'sen',
    'Serbia': 'srb',
    'Spain': 'esp',
    'Sweden': 'swe',
    'Switzerland': 'sui',
    'Tunisia': 'tun',
    'Uruguay': 'uru'
}

function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

module.exports = {
    getGroupName: function (leauge_id) {
        return groupeNames[leauge_id];
    },
    toLowerCase: function (teamName) {
        if (/ /g.test(teamName) === true) {
            return teamName.replace(' ', '-').toLowerCase();
        }
        return teamName.replace('-', ' ').toLowerCase();
    },
    getFifaIcon: function (teamName) {
        return 'https://api.fifa.com/api/v1/picture/flags-fwc2018-5/' + teamAbbr[teamName]
    },
    formatDate: function (date) {
        let newDate = new Date(date);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayName = days[newDate.getDay()];
        let MonthName = months[newDate.getMonth()];
        let DayOfMonth = newDate.getDate();
        let year = newDate.getFullYear();
        return dayName + ', ' + MonthName + ' ' + DayOfMonth + ' ' + year;
    },
    checkTime: function (status, time, datetime, homeScore, awayScore) {
        if (status === 'in progress') {
            let res = time + '<br>' + homeScore + ' - ' + awayScore;
            return new Handlebars.SafeString(res);
        }
        if (status === 'completed') {
            return homeScore + ' - ' + awayScore;
        }

        if (status === 'future') {
            let date = new Date(datetime);
            return (date.getUTCHours() + 3) + ':' + date.getUTCMinutes() + '0';
        }
    },
    ifEqual: function (status) {
        if (status === 'in progress') {
            let res = `<span class="match-stat"></span>`;
            return new Handlebars.SafeString(res);
        }
    },
    ifCompleted: function (status) {
        if (status === 'completed') {
            let res = `<span class="match-statistc"></span>`;
            return new Handlebars.SafeString(res);
        }
    },
    checkEvent: function (typeOfEvent, player, time) {
        if (typeOfEvent === 'substitution-in' || typeOfEvent === 'substitution-out') {
            return "";

        }
        else {
            let image = "";
            if (typeOfEvent === 'yellow-card') {
                image = '<img src="https://hbsipbc.deltatre.net/overlayassets/imgml/events/yellowcard.png" alt="">'
            }
            if (typeOfEvent === 'red-card') {
                image = '<img src="https://hbsipbc.deltatre.net/overlayassets/imgml/events/redcard.png" alt="">'
            }
            if (typeOfEvent === 'goal') {
                image = '<img src="https://hbsipbc.deltatre.net/overlayassets/imgml/events/goal.png" alt="">'
            }

            if (typeOfEvent === 'goal-penalty') {
                image = '<img src="https://hbsipbc.deltatre.net/overlayassets/imgml/events/penalty.png" alt="">'
            }


            let res = `<div class="event">${time} ${image} ${player}</div>`;
            return new Handlebars.SafeString(res);

        }
    },
    myDate: function (date) {
        var result = new Date() - new Date(date);
        var format = convertMS(result);
        if (result < 1000 * 60 * 59) {
            return format.minute + ' minute ago';
        } else if (result < 1000 * 60 * 60 * 24) {
            return format.hour + ' hour ago';
        } else if (result < 1000 * 60 * 60 * 24 * 30) {
            return format.day + ' days ago';
        }
    }
}