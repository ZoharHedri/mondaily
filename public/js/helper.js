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

module.exports = {
    getGroupName: function (leauge_id) {
        return groupeNames[leauge_id];
    },
    toLowerCase: function (teamName) {
        if (/ /g.test(teamName) === true) {
            return teamName.replace(' ', '-').toLowerCase();
        }

        return teamName.replace('-', ' ').toLowerCase();
    }
}