let ques_array = ["If one of us apologizes when our discussion deteriorates, the discussion ends?", "I know we can ignore our differences, even if things get hard sometimes.", "When we need it, we can take our discussions with my spouse from the beginning and correct it.", "When I discuss with my spouse, to contact him will eventually work.", "The time I spent with my wife is special for us.", "We don't have time at home as partners.", "We are like two strangers who share the same environment at home rather than family.", "I enjoy our holidays with my wife.", "I enjoy traveling with my wife.", "Most of our goals are common to my spouse.", "I think that one day in the future, when I look back, I see that my spouse and I have been in harmony with each other.", "My spouse and I have similar values in terms of personal freedom.", "My spouse and I have similar sense of entertainment.", "Most of our goals for people (children, friends, etc.) are the same.", "Our dreams with my spouse are similar and harmonious.", "We're compatible with my spouse about what love should be.", "We share the same views about being happy in our life with my spouse", "My spouse and I have similar ideas about how marriage should be", "My spouse and I have similar ideas about how roles should be in marriage", "My spouse and I have similar values in trust.", "I know exactly what my wife likes.", "I know how my spouse wants to be taken care of when she/he sick.", "I know my spouse's favorite food.", "I can tell you what kind of stress my spouse is facing in her/his life.", "I have knowledge of my spouse's inner world.", "I know my spouse's basic anxieties.", "I know what my spouse's current sources of stress are.", "I know my spouse's hopes and wishes.", "I know my spouse very well.", "I know my spouse's friends and their social relationships.", "I feel aggressive when I argue with my spouse.", "When discussing with my spouse, I usually use expressions such as ‘you always’ or ‘you never’ .", "I can use negative statements about my spouse's personality during our discussions.", "I can use offensive expressions during our discussions.", "I can insult my spouse during our discussions.", "I can be humiliating when we discussions.", "My discussion with my spouse is not calm.", "I hate my spouse's way of open a subject.", "Our discussions often occur suddenly.", "We're just starting a discussion before I know what's going on.", "When I talk to my spouse about something, my calm suddenly breaks.", "When I argue with my spouse, ı only go out and I don't say a word.", "I mostly stay silent to calm the environment a little bit.", "Sometimes I think it's good for me to leave home for a while.", "I'd rather stay silent than discuss with my spouse.", "Even if I'm right in the discussion, I stay silent to hurt my spouse.", "When I discuss with my spouse, I stay silent because I am afraid of not being able to control my anger.", "I feel right in our discussions.", "I have nothing to do with what I've been accused of.", "I'm not actually the one who's guilty about what I'm accused of.", "I'm not the one who's wrong about problems at home.", "I wouldn't hesitate to tell my spouse about her/his inadequacy.", "When I discuss, I remind my spouse of her/his inadequacy.", "I'm not afraid to tell my spouse about her/his incompetence.", `Thank You for honestly completing the questionnaire ! </br>Please click the next button to view result`]

count = 0; // for question numbers
percentage = count; //
responses = []; // List to store the user resposne for each question.
for (i1 = 0; i1 < 54; i1++) {
    responses.push(-1);
}
var answer;


// Helper fn to caluculate progress bar percentage.
function calculate_percentage(c) {
    return Math.round(((c) / 54) * 100);
}


// function prev_question() {
//     if (count > 0) {
//         count = count - 1;
//     }
//     perc = calculate_percentage(count);

//     document.getElementById("QPara").innerHTML = `Question ${count + 1}: ${ques_array[count]}`;
//     document.getElementById("progress_value").style.width = `${perc}%`;
//     document.getElementById("progress_value").innerHTML = `${perc}%`;


// }

function getResult(){
	document.getElementById("result_div").innerHTML = `Your future is ${localStorage.getItem("result")}`;
	console.log(localStorage.getItem("result"))
}

function next_question() {
    console.log(`current count: ${count}`) // Checking current count value
    var ele = document.getElementsByName('tigger'); // stores the response of the user 
    if (document.getElementById("previous_button")) {
        document.getElementById("previous_button").remove();
    }

    if (count > 0) {
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                console.log(Number(ele[i].value));
                responses[count - 1] = Number(ele[i].value);
            }

            // responses.splice(count, 1, Number(ele[i].value));
        }
        // if (responses.length < count) {
        //     responses.splice(count, 1, Number("-1"));
        // }
        // count == 54
        if (count == 5) {
            document.getElementById("QPara").innerHTML = `${ques_array[count]}`;
            //submit the form
            console.log(`final data = ${responses} having type of ${typeof (responses)}`)
            var fi = { "name": "Responses", "value": responses };
            console.log(fi);
            /***$.post("http://127.0.0.1:5000/json-example", { "usr_data": responses }).done(function (result) {
               console.log(`Success - ${result}`);
           }).fail(function () {
               console.log("Error")
           });
***/		
			//var url = "http://127.0.0.1:5000/json-example";
            var url = "/api/json-example";
			$.post(url, { "usr_data": responses }
                , function (data, status) {
                    answer = data.estimated_prediction;
                    //alert("the returned value is" + answer);
					localStorage.setItem("result", answer);
					console.log(localStorage.getItem("result"));
                    console.log(data.estimated_prediction);
                    console.log(status);
                });
			//document.getElementById("my_form").submit();
			
        }
    }

    perc = calculate_percentage(count);
    // Setting radio button values to unchecked after each click.
    for (var i = 0; i < ele.length; i++) {
        ele[i].disabled = false;
        ele[i].checked = false;
    }
    document.getElementById("QPara").innerHTML = `Question ${count + 1}: ${ques_array[count]}`;
    document.getElementById("progress_value").style.width = `${perc}%`;
    document.getElementById("progress_value").innerHTML = `${perc}%`;

    if (count >= 0 || count < 55) {
        count = count + 1;
    }
    console.log(responses)
}

