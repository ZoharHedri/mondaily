

$('.post-review').on('click', () => {
    let userId = JSON.parse(localStorage.getItem('user'));
    if (!userId) {
        alert('you are not connected');
        return;
    }
    let reviewText = $(this).find('review-text').val();
    let matchId = JSON.parse(localStorage.getItem('match'));
    let user = JSON.parse(localStorage.getItem('user'));
})

ajaxPostReview = (postReviewObject) => {
    userId = postReviewObject.userId;

    $.ajax({
        type: 'POST',
        url: '/reviews/add/' + userId,
        data: postReviewObject,
    })
        .then(() => {

        })

}

// $.ajax({
//     method: 'GET',
//     url: '/reviews/match/getMatch',
//     dataType: 'json'
// })
//     .then((match) => {
//         localStorage.setItem('match', JSON.stringify(match));
//     })



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
            window.location.href = '/reviews/displayReviews/' + match.fifa_id;
        })
        .catch((err) => { throw err; })
});