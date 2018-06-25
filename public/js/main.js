
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
        .then((review) => {
            window.location.reload();
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


$standingContainer = $('.standing-container');


$standingContainer.on('click', '.standing-team-flag, .standing-team-name', function () {
    let $fifaCode = $(this).data().fifaCode;
    let curr = $(this);
    $.ajax({
        method: 'GET',
        url: `/matches/match/country/${$fifaCode}`,
    }).then(function (matches) {
        let res = '';

        for (let i = 0; i < matches.length; i++) {
            let score = "";
            let date = formatDate(matches[i].datetime);
            if (matches[i].status === "future") {
                let date = new Date(matches[i].datetime);
                score = (date.getUTCHours() + 3) + ':' + date.getUTCMinutes() + '0';
            }
            if (matches[i].status == "completed") {
                score = matches[i].home_team.goals + ' - ' + matches[i].away_team.goals;
                date = "";
            }
            if (matches[i].status == "in progress") {
                score = matches[i].time + ' <br>' + matches[i].home_team.goals + ' - ' + matches[i].away_team.goals;

            }
            res += `<div class="standing-team-match">
            <div class="standing-team-match-date text-center">${date}</div>
            <div class="row p-2">
                <div class="col-md-5 text-right">
                    <span class="standing-team-match-name">
                        ${matches[i].home_team.country}
                    </span>
                    <img src="https://api.fifa.com/api/v1/picture/flags-fwc2018-2/${matches[i].home_team.code}" alt="">
                </div>
                <div class="col-md-2 text-center">
                    <div class="standing-team-match-score">
                        ${score}
                    </div>
                </div>
                <div class="col-md-5">
                    <img src="https://api.fifa.com/api/v1/picture/flags-fwc2018-2/${matches[i].away_team.code}" alt="">
                    <span class="standing-team-match-name">
                    ${matches[i].away_team.country}
                    </span>
                </div>
            </div>
        </div>`;

        }
        $td = curr.closest('tr').next().find('td');
        $td.empty();
        $td.append(res);
        $td.toggleClass('hide');
    })
});


$matchContainer.on('click', '.match-statistc', function () {
    $match_id = $(this).closest('.row').data().id;
    $.ajax({
        method: 'GET',
        url: `/matches/match/${$match_id}`
    })
        .then((match) => {
            $('#bootstrap-modal').find('.home-team-modal').empty();
            $('#bootstrap-modal').find('.away-team-modal').empty();
            $('#bootstrap-modal').find('.home-team-goal-attempts').empty();
            $('#bootstrap-modal').find('.away-team-goal-attempts').empty();
            $('#bootstrap-modal').find('.home-team-on-target').empty();
            $('#bootstrap-modal').find('.away-team-on-target').empty();
            $('#bootstrap-modal').find('.home-team-off-target').empty();
            $('#bootstrap-modal').find('.away-team-off-target').empty();
            $('#bootstrap-modal').find('.home-team-blocked').empty();
            $('#bootstrap-modal').find('.away-team-blocked').empty();
            $('#bootstrap-modal').find('.home-team-corners').empty();
            $('#bootstrap-modal').find('.away-team-corners').empty();
            $('#bootstrap-modal').find('.home-team-offsides').empty();
            $('#bootstrap-modal').find('.away-team-offsides').empty();
            $('#bootstrap-modal').find('.home-team-ball-possession').empty();
            $('#bootstrap-modal').find('.away-team-ball-possession').empty();
            $('#bootstrap-modal').find('.home-team-pass-accuracy').empty();
            $('#bootstrap-modal').find('.away-team-pass-accuracy').empty();
            $('#bootstrap-modal').find('.home-team-num-passes').empty();
            $('#bootstrap-modal').find('.away-team-num-passes').empty();

            $('#bootstrap-modal').find('.home-team-passes-completed').empty();
            $('#bootstrap-modal').find('.away-team-passes-completed').empty();
            $('#bootstrap-modal').find('.home-team-distance-covered').empty();
            $('#bootstrap-modal').find('.away-team-distance-covered').empty();
            $('#bootstrap-modal').find('.home-team-balls-recovered').empty();
            $('#bootstrap-modal').find('.away-team-balls-recovered').empty();
            $('#bootstrap-modal').find('.home-team-tackles').empty();
            $('#bootstrap-modal').find('.away-team-tackles').empty();
            $('#bootstrap-modal').find('.home-team-clearances').empty();
            $('#bootstrap-modal').find('.away-team-clearances').empty();
            $('#bootstrap-modal').find('.home-team-yellow-cards').empty();
            $('#bootstrap-modal').find('.away-team-yellow-cards').empty();
            $('#bootstrap-modal').find('.home-team-red-cards').empty();
            $('#bootstrap-modal').find('.away-team-red-cards').empty();
            $('#bootstrap-modal').find('.home-team-fouls-committed').empty();
            $('#bootstrap-modal').find('.away-team-fouls-committed').empty();


            $('#bootstrap-modal').find('.home-team-modal').append(match.home_team.country);
            $('#bootstrap-modal').find('.away-team-modal').append(match.away_team.country);
            $('#bootstrap-modal').find('.home-team-goal-attempts').append(match.home_team_statistics.attempts_on_goal);
            $('#bootstrap-modal').find('.away-team-goal-attempts').append(match.away_team_statistics.attempts_on_goal);
            $('#bootstrap-modal').find('.home-team-on-target').append(match.home_team_statistics.on_target);
            $('#bootstrap-modal').find('.away-team-on-target').append(match.away_team_statistics.on_target);
            $('#bootstrap-modal').find('.home-team-off-target').append(match.home_team_statistics.off_target);
            $('#bootstrap-modal').find('.away-team-off-target').append(match.away_team_statistics.off_target);
            $('#bootstrap-modal').find('.home-team-blocked').append(match.home_team_statistics.blocked);
            $('#bootstrap-modal').find('.away-team-blocked').append(match.away_team_statistics.blocked);
            $('#bootstrap-modal').find('.home-team-corners').append(match.home_team_statistics.corners);
            $('#bootstrap-modal').find('.away-team-corners').append(match.away_team_statistics.corners);
            $('#bootstrap-modal').find('.home-team-offsides').append(match.home_team_statistics.offsides);
            $('#bootstrap-modal').find('.away-team-offsides').append(match.away_team_statistics.offsides);
            $('#bootstrap-modal').find('.home-team-ball-possession').append(match.home_team_statistics.ball_possession + '%');
            $('#bootstrap-modal').find('.away-team-ball-possession').append(match.away_team_statistics.ball_possession + '%');
            $('#bootstrap-modal').find('.home-team-pass-accuracy').append(match.home_team_statistics.pass_accuracy + '%');
            $('#bootstrap-modal').find('.away-team-pass-accuracy').append(match.away_team_statistics.pass_accuracy + '%');
            $('#bootstrap-modal').find('.home-team-num-passes').append(match.home_team_statistics.num_passes);
            $('#bootstrap-modal').find('.away-team-num-passes').append(match.away_team_statistics.num_passes);

            $('#bootstrap-modal').find('.home-team-passes-completed').append(match.home_team_statistics.passes_completed);
            $('#bootstrap-modal').find('.away-team-passes-completed').append(match.away_team_statistics.passes_completed);
            $('#bootstrap-modal').find('.home-team-distance-covered').append(match.home_team_statistics.distance_covered);
            $('#bootstrap-modal').find('.away-team-distance-covered').append(match.away_team_statistics.distance_covered);
            $('#bootstrap-modal').find('.home-team-balls-recovered').append(match.home_team_statistics.balls_recovered);
            $('#bootstrap-modal').find('.away-team-balls-recovered').append(match.away_team_statistics.balls_recovered);
            $('#bootstrap-modal').find('.home-team-tackles').append(match.home_team_statistics.tackles);
            $('#bootstrap-modal').find('.away-team-tackles').append(match.away_team_statistics.tackles);
            $('#bootstrap-modal').find('.home-team-clearances').append(match.home_team_statistics.clearances);
            $('#bootstrap-modal').find('.away-team-clearances').append(match.away_team_statistics.clearances);
            $('#bootstrap-modal').find('.home-team-yellow-cards').append(match.home_team_statistics.yellow_cards);
            $('#bootstrap-modal').find('.away-team-yellow-cards').append(match.away_team_statistics.yellow_cards);
            $('#bootstrap-modal').find('.home-team-red-cards').append(match.home_team_statistics.red_cards);
            $('#bootstrap-modal').find('.away-team-red-cards').append(match.away_team_statistics.red_cards);
            $('#bootstrap-modal').find('.home-team-fouls-committed').append(match.home_team_statistics.fouls_committed);
            $('#bootstrap-modal').find('.away-team-fouls-committed').append(match.away_team_statistics.fouls_committed);

            $('#bootstrap-modal').modal({
                show: true
            });
        })
});


let formatDate = function (datetime = new Date()) {
    let today = new Date(datetime);
    let year = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    let days = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    return `${year}-${month}-${days}`;
}

//chat
let charArray = []; //arr of obj chat
let currentId = 0;

$('#btn-chat').on('click', function () {
    let inpuChat = $("body").find("#input-chat").val();
    //console.log(inpuChat); good

    creatPost(inpuChat);
    // renderPost(inpuChat);
    $("body").find("#input-chat").val("");
})


let creatPost = function (textChat) {

    let matchChat = JSON.parse(localStorage.getItem('match'));
    let userChat = JSON.parse(localStorage.getItem('user'));

    console.log(matchChat);



    let post = {
        matchid: matchChat.fifa_id,
        username: userChat ? userChat.name : 'Anonymous',
        text: textChat
    }

    charArray.push(post);
    console.log(charArray);

    $.ajax({
        type: "POST",
        url: '/chats/addChat',
        data: post,
        success: function (data) {
            console.log(data);//good
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};


setInterval(function () {
    if (/displayReviews/g.test(window.location.href)) {
        let match = JSON.parse(localStorage.getItem('match'));
        $.ajax({
            method: 'GET',
            url: '/chats/getChat/' + match.fifa_id //match.fifa_id
        }).then((chats) => {
            $('.chat-container').empty();
            let res = "";
            chats.forEach(element => {
                // let date = new Date();
                // let currentDate = date.getHours() + ":" + date.getMinutes();
                let username = element.user_name || 'Anonymous';
                res += `<div class="container1 darker">
            <span class="chat-user">${username}: </span> 
            <span class="chat-text">${element.text}</span>
        </div>`
            });
            $('.chat-container').append(res);
            $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
        })
        //ajax => get all chat of this mach
        //renderPost 
    }
}, 1000);



let renderPost = function () {

    /*<div class="container darker">
                <p>Hello. How are you today?</p>
                <span class="time-right">11:00</span>
            </div>
*/
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

//post js
$('.post__comment').on('keyup', function (event) {
    if (event.keyCode == 13) {
        $(this).closest('div').css('z-index', '-10');
        let $postComment = $(this).val();
        let $postId = $(this).closest('.post').data().id;
        let userId = JSON.parse(localStorage.getItem('user')).id;
        let $commentWarp = $(this).closest('.post').find('post__body__comments');
        if ($postComment === " ") {
            return;
        }
        $.ajax({
            method: 'POST',
            url: '/reviews/comments/add',
            data: { postId: $postId, postComment: $postComment, userId: userId }
        }).then((lastComment) => {
            console.log(lastComment);
            // window.location.reload();
        });

        $(this).val('');
    }
});

$('input[type="checkbox"]').change(function () {
    if (this.checked) {
        $(this).next().next().css('z-index', '10');
        this.checked = false;
    }
})

$('.post__header__icon_warp__menu__item').click(function () {
    $(this).closest('ul').css('z-index', '-10');
})

$('.deletePost').click(function () {
    let $post = $(this).closest('.post');
    let $postId = $post.data().id;
    let userLocal = JSON.parse(localStorage.getItem('user')).name;
    let $userPost = $post.find('.post__header__profile_warp__username').text();
    if (userLocal !== $userPost) {
        return;
    }

    $.ajax({
        method: 'DELETE',
        url: '/reviews/delete/' + $postId
    }).then(() => {
        window.location.reload();
    })
});


if (JSON.parse(localStorage.getItem('user'))) {
    $('.register-item').hide();
    $('.login-item').hide();
} else {
    $('.logout-item').hide();
}

$('.logout-item').click(function () {
    localStorage.removeItem('user');
    window.location.reload();
});