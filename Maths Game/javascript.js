var playing=false;
var score;
var action;
var timeRemaining;
var correctAns
//click on start button
function startClick(){
    //playing?
    if(playing){
        //Yes -> Relod the page
        location.reload();
    }
    //No -> 
    else{
        playing=true;
        //hide game over message
        hide("gameOver");
        //reset score
        score=0;
        document.getElementById("points").innerText=score;
        //show counter
        show("timeRemaining");
        timeRemaining=60;
        document.getElementById("remainingTimeValue").innerText=timeRemaining;
        //Reduce counter by 1
        startCountDown();                
        //change text to reset
        document.getElementById("startreset").innerText="Reset Game";
        //show Q&A
        showQA();
    }
}   
        
//click ans box
for(i=1;i<=4;i++){
    document.getElementById("box"+i).onclick=function(){
    //playing?
    //yes ->
    if(playing){        
        //correct?
        if(this.innerText==correctAns){
            //yes ->
            //show correct for 1 sec
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            //increase score
            score++;
            document.getElementById("points").innerText=score;
            //show next q&a
            showQA();
            //reset counter
            clearInterval(action);
            timeRemaining=60;
            startCountDown();

        }        
        //no -> show try again
        else{
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
    //no -> no action   
    
    }
}
function choiceClick(isCorrect){
      
}

//start counter
function startCountDown(){
    action=setInterval(function(){
        timeRemaining--;
        document.getElementById("remainingTimeValue").innerText=timeRemaining;
        //if counter=0, show game over
        if(timeRemaining==0){
            clearInterval(action);
            stopCountDown();
        }
    },1000);
}

//stop counter
function stopCountDown(){
    show("gameOver");
    document.getElementById("totalscore").innerText=score;
    hide("timeRemaining");
    hide("correct");
    hide("wrong");
    document.getElementById("startreset").innerText="Start Game";
    playing=false;
}

//hide an element
function hide(id){
    document.getElementById(id).style.display="none";
}

//show an element
function show(id){
    document.getElementById(id).style.display="block";
}

function showQA(){
    //Generate two random numbers b/w 1 & 10
    var firstNo= 1 + Math.floor(Math.random()*9);
    var secNo= 1 + Math.floor(Math.random()*9);
    correctAns= firstNo * secNo;
    //show in question box
    document.getElementById("question").innerText=firstNo+" x "+secNo;
    //show result in one of the ans box
    var correctBox = 1 + Math.floor(Math.random() * 3);
    document.getElementById("box"+correctBox).innerText=correctAns;
    //show random numbers in other boxes
    var answers=[correctAns];
    for(i=1; i<5; i++){
        if(i!=correctBox){
            var wrongAns;
            do{
                wrongAns=(1 + Math.floor(Math.random()*9)) * (1 + Math.floor(Math.random()*9));
            }while(answers.indexOf(wrongAns) > -1);

            answers.push(wrongAns);
            document.getElementById("box"+i).innerText = wrongAns;
        }
    }
}