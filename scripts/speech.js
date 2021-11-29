$(document).ready(function () {
    var speechOutput = $('#speechRes');
    var table = $('#commandsTable');
    $(speechOutput).height($(table).height());
    var commands = ['Remind me to buy milk tomorrow.',
        'How many days are left until Christmas?',
        'My birthday is on 16th of July',
        'Mark every monday as free day'];

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognizer = new SpeechRecognition();
    recognizer.lang = 'en-US';

    $("#speakBtn").click(function () {
        recognizer.start();
        console.log('Button pressed')
    })

    recognizer.onresult = function (event) {
        recognizer.stop();
        var res = event.results[0][0].transcript;
        console.log(res);
        var commandIndex = commands.indexOf(res);
        console.log(commandIndex);
        if (commandIndex > -1) {
            if (commandIndex === 0) {
                let tomorrow = new Date(Date.now());
                tomorrow.setDate(tomorrow.getDate() + 1);
                let listItem = document.getElementById('day' + tomorrow.getDate());
                listItem.style.background = "#437C90";
                $("#resultText").text(("Your command: " + res).toString());
                var card = `<div id="event-card" class = "card hidden-card"> <div class="card-body">
                <h5 class="card-title">Event</h5>
                <p class="card-text">Buy milk</p>
                </div></div>`;

                $("#listItem" + tomorrow.getDate()).append(card);

                $("#day" + tomorrow.getDate()).mouseenter(function () {
                    $("#event-card").show();
                });
                
                $("#day" + tomorrow.getDate()).mouseleave(function () {
                    $("#event-card").hide();
                });

            } else if (commandIndex === 1) {
                let currentDate = new Date(Date.now());
                if (currentDate.getMonth() == 11 && currentDate.getDate() > 25) {
                    var nextChristmas = new Date('December 25, ' + currentDate.getFullYear() + 1 + ' 00:00:00');
                } else {
                    var nextChristmas = new Date('December 25, ' + currentDate.getFullYear() + ' 00:00:00');
                }
                let daysUntilChristmas = Math.ceil(Math.abs(nextChristmas - currentDate) / (1000 * 60 * 60 * 24));

                $("#resultText").text(("Your command: " + res + ".    Days until next Christmas: " + daysUntilChristmas).toString() + ".");
            }
        } else {
            console.log('not found');
            $("#resultText").text(("Your command: " + res + "Please use one of the commands on the left.").toString());
        }


        $("#resultText").css('font-weight', 'bold');
    }

    

})