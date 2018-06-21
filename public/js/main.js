


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
            alert(match.fifa_id + ' : ' + $match_id);
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

