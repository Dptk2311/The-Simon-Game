var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

//detecting click on h1

$("h1").click(function(){
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();  
        started=true;
    }
    
});

//when clicked

$("div.btn").click(function(event){
    var userChosenColour = (event.currentTarget.id);
    //var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

//function to generate random number and update the game

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("h1").text("Level " + level);

    var randomNumber= Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
    
}

//function to play sound

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3")
    audio.play();
}

//function to animate button presses

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};

//function to check user pattern matches with game pattern

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    
    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Click here to Restart");
        
        
        
        startOver();
    }
};

//function to restart the game

function startOver(){
   
    level=0;
    started=false;
    gamePattern=[];

    
}

