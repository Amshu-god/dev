document.getElementById('matchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let homeTeam =  document.getElementById('homeTeam').value; 
    let awayTeam = document.getElementById('awayTeam').value; 
    let awayTeam2 = document.getElementById('awayTeam2').value; 
    console.log(awayTeam2)
    adv = 201 + Number(awayTeam2)
    homeTeam = capitalizeFirstLetter(homeTeam)
    awayTeam = capitalizeFirstLetter(awayTeam)
    // let advantage = document.getElementById('advantage').value; // Convert to number
    // advantage = advantage.value
    //advantage = Number(advantage)
    const selectedTeam = document.querySelector('input[name="team"]:checked').value;
    if(selectedTeam==="Home"){
        batfirst=homeTeam
        batsecond = awayTeam
    }
    else{
        batfirst = awayTeam
        batsecond = homeTeam
    }

    document.getElementById("form").style.display = "none";
    document.getElementById("simulator").style.display = "block";
    document.getElementById('team1').textContent = homeTeam
    document.getElementById('team2').textContent = awayTeam
    document.getElementById('battingsecond').textContent = batsecond
    
});

function capitalizeFirstLetter(str) {
    if (!str) return ''; // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
             
                function isBetween(num, min, max) {
                    return num >= min && num <= max;
                }



let atkmode = false
let panikmode = false
let target = 6478997429871987
let totalScore = 0;
let totalWickets = 0;
let totalBalls = 0;
let tov = 50;
let currentOver = [];  // To store the runs and wickets of the current over

function addRun(runs) {
    totalScore += runs;
    document.getElementById('totalScore').textContent = totalScore;

    if (runs===0){
        document.getElementById('lastBall').textContent = `Dot ball`;

    }
    else if(runs===4){
        document.getElementById('lastBall').textContent = `FOUR!`;

    }
    else if(runs===6){
        document.getElementById('lastBall').textContent = `SIX!!`;

    }
    else{
       document.getElementById('lastBall').textContent = `${runs} run(s) scored`;

}
currentOver.push(runs);  // Add run to current over
    
    updateCurrentOverDisplay();
}

function addExtras(runs) {
    totalScore += runs;
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('lastBall').textContent = `${runs} run(s) scored`;
    
    currentOver.push( runs+'wi');  // Add run to current over
   
    updateCurrentOverDisplay();
}

function addExtrasNb(runs) {
    totalScore += runs;
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('lastBall').textContent = `${runs} run(s) scored`;
    
    currentOver.push( runs+'NB');  // Add run to current over
    
    updateCurrentOverDisplay();
}

function addWicket() {
    if (totalWickets < 10) {
        totalWickets++;
        document.getElementById('wickets').textContent = totalWickets;
        document.getElementById('lastBall').textContent = `Wicket!!`;

        currentOver.push('W');  // Add wicket to current over
       
        updateCurrentOverDisplay();
    }
}

function addBall() {
    totalBalls++;
    let overs = Math.floor(totalBalls / 6);
    let balls = totalBalls % 6;
    document.getElementById('overs').textContent = `${overs}.${balls}`;
    
    // Reset the over after 6 balls
    if (balls === 1) {
        currentOver = [];  // Reset the over array
    }
}

function updateCurrentOverDisplay() {
    // Join the array into a string like "0 1 wicket 4"
    document.getElementById('currentOver').textContent = currentOver.join(' ') || '-';
}


//lotaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
document.getElementById("elevated").style.display = "none";
document.getElementById("simulator").style.display = "none";// hideing the simulator

let ing = 1
 function lota(){
    if(ing===1){
        if( totalBalls <300 && totalWickets <10 && target>totalScore){
             lets()
            }
        else {
             ing = 2
             target = totalScore
             totalScore = 0;
             document.getElementById('totalScore').textContent = totalScore;
             totalWickets = 0;
             totalBalls = 0;
             document.getElementById('wickets').textContent = totalWickets;
             document.getElementById('inn').textContent='Second innings : '+ batsecond
            }
    }
    else{
        if( totalBalls <300 && totalWickets <10 && target>=totalScore){
            lets()
            document.getElementById('target').textContent= (target+1)
           }
       else {

            if ( totalWickets>=10 || totalBalls>=300){
                document.getElementById('inn').textContent=batfirst + ' won by ' +(target-totalScore) + " runs"
            }
            else{
                document.getElementById('inn').textContent= batsecond + ' won by ' + (10-totalWickets) + " wickets"
            }
            
           }
    }
   
 }



function lets() {
//    adv = 201 + awayTeam2
    random = Math.floor(Math.random() * adv)
    console.log(random , adv)
    ov = Math.floor(totalBalls / 6)
    ovpw = 5
    console.log(ov)
//ing=2
    if(random>200){
        parking =  (random - 200) % 5
        switch(parking){
            case 0 :
               if(ing==1){
                addBall()
                addRun(6)
               }
               else{
                addBall()
                if(random % 10 == 0 ){
                    addWicket()
                }
               }
                break;
                case 1:
                    addBall()
                    if(ing == 1){

                        addRun(1)
                    }
                    break;
                    case 2:
                        addBall()
                        if(ing==1){

                            addRun(2)
                        }
                        break;
                        case 3 :
                            addBall()
                            if (ing==1){

                                addRun(2)
                            }
                            break;
                            case 4 :
                                addBall()
                                if (ing == 1){

                                    addRun(4)
                                }
                                break;
                            }
    }

    //panik bat check

    else if( (ov >= (tov-3)) || (panikmode)){
        panik = Math.floor(Math.random() * 5)
        console.log('its an emergency')
        switch(panik){
            case 0 :
                addBall()
                addWicket()
                break;
                case 1:
                    addBall()
                    addRun(0)
                    break;
                    case 2:
                        addBall()
                        addRun(1)
                        break;
                        case 3 :
                            addBall()
                            addRun(4)
                            break;
                            case 4 :
                                addBall()
                                addRun(6)
                                break;
                            }
                        }
                        //attack mode batting
    else if((totalBalls>(tov*6/20)) && ((predict()<7)||(atkmode)) && ((isBetween(random,75,90) || isBetween(random,175,200) ))) {
        console.log('we are attacking')
        if (isBetween(random,75,85) || isBetween(random,175,185)){
            addBall()
            addRun(4)
        }
        else if(isBetween(random,86,89)){
            addBall()
            addRun(6)
        }
        else if(isBetween(random,190,200)){
            addBall()
            addWicket()
        }
    }
    else {
        if(isBetween(random,11,50)||isBetween(random,115,150)){
            addBall()
            addRun(0)
        }
        else if((isBetween(random,51,74))||(isBetween(random,151,174))){
            addBall()
            addRun(1)
        }
        else if((isBetween(random,75,85))||(isBetween(random,175,184))){
            addBall()
            addRun(2)
        }
        else if(isBetween(random,86,89)){
            addBall()
            addRun(3)
        }
        else if((isBetween(random,90,99))||(isBetween(random,185,189))){
            addBall()
            addRun(4)
        }
        else if(isBetween(random,100,105)){
            addBall()
            addRun(6)
        }
        else if(random===106){
            addExtras(1)
        }
        else if(random===107){
            addExtrasNb(1)
        }
        else if(random===108){
                        addRun(1)
                        addBall()
                    }
                    else if(random===109){
                        addRun(1)
                        addBall()
                    }
                    else if(random===110){
                        addBall()
                        addWicket()
                    }
                    else if(random===111){
                        addBall()
                        addWicket()
        }
        else if(random===112){
            addBall()
            addWicket()
        }
        else if(random===113){
            addBall()
            addWicket()
        }
        else if(random===114){
            addBall()
            addWicket()
        }
        else if(isBetween(random,190,200)||isBetween(random,0,10)){
            addBall()
            addRun(0)
            addBall()
            addRun(0)
            addBall()
            addRun(0)
        }
        
    }
    
    
    
    ovr = totalBalls/6
    rr = (totalScore/ovr).toFixed(2)
    document.getElementById('RunRate').textContent=rr


    predict()
    
}

ovr = totalBalls/6


function auto(){

    document.getElementById('inn').textContent='First innings : ' + batfirst
    let intervalId;

    function startInterval() {
        intervalId = setInterval(function() {
            console.log("Task running every 2 seconds");
            
            lota()
            
        
            
        }, 800);
    }
    
    function stopInterval() {
        clearInterval(intervalId);
    }
    
    startInterval()

    if(totalBalls>=300||totalWickets>=10||target<totalScore){
        stopInterval()
    }
}

tovv = tov

function predict() {
    // let tov = document.getElementById("tov").value;
    // let ov = document.getElementById("ov").value;
    // let ru = document.getElementById("ru").value;
    // let wi = document.getElementById("wi").value;
    // let rr = ru / ov;
    let wr = totalWickets / ovr;
    let wr2 = ovr / totalWickets;
    let ewi = wr * tov
    if (ewi >= 10) {
      tovv = wr2 * 10;
      ewi = 10
      off = (tovv - ovr);
      eru = rr * tovv + off
    }
     else {
  
  
      ewi = Math.ceil(wr * tovv)
      if (ovr > tovv/5){
       
    
      of = (tovv - ovr) / 3;
      off = of * (10 - ewi);}
      else{
      off = tovv - ovr;
      }
      eru = Math.ceil(rr * tovv + off)
    }
  
    // console.log(eru, ewi);
    document.getElementById('prediction').textContent = Math.round(eru)+'/'+Math.floor(ewi);

    if (ing!==1){
        rembal = 300 - totalBalls
        remove = rembal/6
        remtar = target - totalScore
        rrr = remtar/remove
        document.getElementById('reqRr').textContent = rrr.toFixed(2)
        document.getElementById('remtar').textContent = (remtar+1)
        document.getElementById('rembal').textContent = rembal
        document.getElementById("elevated").style.display = "block"; 

        if (rrr>=15){
            panikmode = true
            atkmode = false
            console.log('panik mode')
        }
        else if (rrr>10){
            panikmode = false
            atkmode = true
            console.log('atk mode')
        }
        else{
            panikmode = false
            atkmode = false
        }
    }
    return ewi
    
  }


