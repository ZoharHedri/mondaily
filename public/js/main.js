
// setInterval(function updateStanding() {
//     $.ajax({
//         type: 'GET',
//         url: '/standing/update'
//     });
// }, 1000 * 60 * 1 * 1);nam

$("#singlebutton").on('click', function () {

    let userName = $("body").find("#textinput").val();
    let usereEmail = $("body").find("#email").val();
    let userPasswor = $("body").find("#passwordinput").val();
    console.log(userName + ' ' + usereEmail + ' ' + userPasswor);
    //alert(username + ' ' + email + ' ' + password); good 

    $.ajax({
        type: "POST",
        url: '/users/register',
        data: { userName, usereEmail, userPasswor }
    });

});


$("#login-btn").on('click', function () {

    let userLogin = $("body").find("#user-login").val();
    let passwordLogin = $("body").find("#password-login").val();

    //alert(userLogin + ' ' + passwordLogin); good


});