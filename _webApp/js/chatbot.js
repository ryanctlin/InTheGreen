var messages = [], //array that hold the record of each string in chat
    lastUserMessage = "", //keeps track of the most recent input string from the user
    botMessage = "", //var keeps track of what the chatbot is going to say
    newBotMessage = "",
    bestComp = "['CBRE', 'TEL', 'PLD', 'PEAK', 'KEYS']",
    worstComp = "['CMS', 'STT', 'NLOK', 'HLT', 'XRX']",
    botName = 'Greenbot', //name of the chatbot
    talking = true; //when false the speach function doesn't work

    messages.push("<b>" + botName + ":</b> " + "Hello there! What can I help you with?");
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
    if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function getComp() {
    // url best
    url_best = "https://sustainstocks.azurewebsites.net/api/qna/best";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url_best,false);
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200){
            bestComp = xhr.response.text();
        }
    }
    
    url_worst = "https://sustainstocks.azurewebsites.net/api/qna/worst";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url_worst,false);
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200){
            worstComp = xhr.response.text();
        }
    }
}
//azure API chatbot
function chatbotResponse() {
    talking = true;
    
    var host = "https://sustainableqna.azurewebsites.net/qnamaker";

    // Authorization endpoint key
    // From Publish Page
    var endpoint_key = "e7f302a7-4d1e-4ec7-af98-8021a9551532";

    // Management APIs postpend the version to the route
    // From Publish Page, value after POST
    var route = "/knowledgebases/6dce2bff-95d6-436a-a6e5-6b9fecbdc1a3/generateAnswer";

    // JSON format for passing question to service
    var question = {
        'question': lastUserMessage,
        'top': 3,
    };

    var url = host + route;
    //get best and worst companies
    //make api call
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url,false);
    xhr.setRequestHeader('Authorization',"EndpointKey " + endpoint_key);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200){
            var resp = JSON.parse(xhr.response);
            var raw_text = resp["answers"][0]["answer"];
            //get bot message answer
            if(raw_text.includes("$best")){
                botMessage = raw_text.replace("$best",bestComp);
            }else if(raw_text.includes("$worst")){
                botMessage = raw_text.replace("$worst",worstComp);
            }else{
                botMessage = raw_text;
            }
        }
    }
    xhr.send(JSON.stringify(question));   
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
    //if the message from the user isn't empty then run 
    if (document.getElementById("chatbox").value != "") {
        //pulls the value from the chatbox ands sets it to lastUserMessage
        lastUserMessage = document.getElementById("chatbox").value;
        //sets the chat box to be clear
        document.getElementById("chatbox").value = "";
        //adds the value of the chatbox to the array messages
        messages.push(lastUserMessage);
        //Speech(lastUserMessage);  //says what the user typed outloud
        //get best and worst stocks
        //getComp();
        //sets the variable botMessage in response to lastUserMessage
        chatbotResponse();
        //add the chatbot's name and message to the array messages
        messages.push("<b>" + botName + ":</b> " + botMessage);
        // says the message using the text to speech function written below
        Speech(botMessage);
        //outputs the last few array elements of messages to html
        for (var i = 1; i < 8; i++) {
            if (messages[messages.length - i])
                document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
        }
    }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
    if ('speechSynthesis' in window && talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        //msg.voice = voices[10]; // Note: some voices don't support altering params
        //msg.voiceURI = 'native';
        //utterance.volume = 1; // 0 to 1
        //utterance.rate = 0.1; // 0.1 to 10
        //utterance.pitch = 1; //0 to 2
        //utterance.text = 'Hello World';
        //utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        //runs this function when enter is pressed
        newEntry();
    }
    if (key == 38) {
        console.log('hi')
        //document.getElementById("chatbox").value = lastUserMessage;
    }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
    document.getElementById("chatbox").placeholder = "";
}