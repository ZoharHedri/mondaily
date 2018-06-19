


// setInterval(function updateStanding() {
//     $.ajax({
//         type: 'GET',
//         url: '/standing/update'
//     });
// }, 1000 * 60 * 1 * 1);


let $matchContainer = $('.match');

let getMatchFromDatabase = function (match_id) {
    return $.ajax({
        method: 'GET',
        url: `/matches/match/${match_id}`
    })
}

let goToReview = function () {
    $.ajax({
        method: 'GET',
        url: '/reviews'
    })
}

$matchContainer.on('click', '.match-team-name, .match-icon-flag', function () {
    let match_id = $(this).closest('.row').data().id;
    getMatchFromDatabase(match_id)
        .then((match) => {
            localStorage.setItem('match', JSON.stringify(match));
            window.location.href = '/reviews/displayReviwes/' + match.fifa_id;
        })
        .catch((err) => { throw err; })
});