
//http://worldcup.sfg.io


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
            window.location.href = '/reviews/displayReviwes/' + match.fifa_id;
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