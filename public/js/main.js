

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


