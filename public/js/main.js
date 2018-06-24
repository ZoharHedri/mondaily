
//http://worldcup.sfg.io

$('.save-post').on('click', function () {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('you are not connected');
        return;
    }
    let reviewText = $('.review-text').val();
    let matchId = JSON.parse(localStorage.getItem('match')).fifa_id;
    let userId = user.id;

    ajaxPostReview({ userId: userId, reviewText: reviewText, matchId: matchId });
})

ajaxPostReview = (postReviewObject) => {

    $.ajax({
        type: 'POST',
        url: '/reviews/add/',
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


//register
$("#Regbutton").on('click', function () {

    let userName = $("body").find("#textinput").val();
    let usereEmail = $("body").find("#email").val();
    let userPasswor = $("body").find("#passwordinput").val();
    let userCountry = $("body").find("#selectCountry").val();
    //console.log(userName + ' ' + usereEmail + ' ' + userCountry + ' ' + userPasswor);
    //alert(userName + ' ' + usereEmail + ' ' + userCountry + ' ' + userPasswor); good

    $.ajax({
        type: "POST",
        url: '/users/register',
        data: { userName, usereEmail, userPasswor, userCountry }
    }).then((e) => {
        window.location.replace('/users/login');
        console.log("login");
    });

});

//login
$("#login-btn").on('click', function () {

    let userNameLogin = $("body").find("#user-login").val();
    let passwordLogin = $("body").find("#password-login").val();
    //console.log(userLogin + ' ' + passwordLogin); good    

    $.ajax({
        type: "POST",
        url: '/users/login',
        data: { userNameLogin, passwordLogin },
        dataType: 'json',
        success: function (data) {
            window.location.replace('../..'); //index
            //console.log(data);//good
            saveToLocalStorage(data);

            //change button to logout

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            $("body").find("#user-login").val("");
            $("body").find("#password-login").val("");
        }
    });

    // store, a JS object as JSON string, in local storage under the key "user"
    let saveToLocalStorage = function (getData) {
        //console.log(gatData._id + ' ' + gatData.user_name + ' ' + gatData.country); //good
        localStorage.setItem('user', JSON.stringify({ id: getData._id, name: getData.user_name, country: getData.country }));
    }


});


//match
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


//chat
let charArray = []; //arr of obj chat
let flag;
$('.chat-container').on('#btn-chat', function () {
    creatPost();
    renderPost();
})
/*<div class="container darker">
                <p>Hello. How are you today?</p>
                <span class="time-right">11:00</span>
            </div>
*/

let creatPost = function () {
    let post = {
        matchid: "",
        username: "",
        text: ""
    }
}

let renderReviews = function () {
    let matchId = JSON.parse(localStorage.getItem('match')).fifa_id;
    if (/displayReviews/g.test(window.location.href)) {

        $.ajax({
            method: 'GET',
            url: '/reviews/match/' + matchId
        })
            .then((reviews) => {
                let res = "";
                $('.review-container').empty();
                reviews.forEach(element => {
                    res += `<div>${element.userId.user_name} - ${element.reviewText}</div>`
                });
                $('.review-container').append(res);
            })
    }
}

//setInterval(renderReviews, 1000 * 10);