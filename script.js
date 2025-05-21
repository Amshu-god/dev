let team1 = [];
let team2 = [];
let teamnames = {teamA:'team 1', teamB :'team 2'}
let currentInnings = 1;
let overs = 0;
let ballsBowled = 0;
let maxBalls = 0;
let team1Score = 0;
let team2Score = 0;
let teamWickets = 0;
let score = 0
let runsNeeded = 0
let runrate = 0
let requiredrunrate = 0

let striker, nonStriker, bowler, previousBowler;
let currentBattingTeam, currentBowlingTeam;
let bowlerQueue = [];
const bowlerStats = {};
const batsmanStats = {};

document.getElementById('loadTeams').addEventListener('click', () => {
    loadTeam('team1File', team1, teamnames.teamA);
    loadTeam('team2File', team2, teamnames.teamB);
    document.querySelector('.overs-section').classList.remove('hidden');
});

document.getElementById('startMatch').addEventListener('click', () => {
    overs = parseInt(document.getElementById('oversInput').value, 10);
    if (isNaN(overs) || overs < 1) {
        console.log('Please enter a valid number of overs.');
        return;
    }
    maxBalls = overs * 6;
    startInnings();
    document.querySelector('.overs-section').classList.add("hidden")
});

document.getElementById('endOver').addEventListener('click', () => {
    overhasended()
});

function overhasended() {
    changeEnds();
    rotateBowler();
}
let g = 0 
function loadTeam(inputId, teamArray, teamName) {

    const fileInput = document.getElementById(inputId);
    if (fileInput.files.length === 0) {
        alert(`Please upload a file for ${teamName}`);
        return;
    }
    
    const file = fileInput.files[0];
    teamName = file.name
    g++
    switch(g){
        case 1:
            teamnames.teamA = teamName.slice(0, -4)
            break;
        case 2:
            teamnames.teamB = teamName.slice(0, -4)
            document.getElementById('teamupload').classList.add("hidden")
    }
    const reader = new FileReader();

    reader.onload = (event) => {
        const lines = event.target.result.split('\n');
        lines.forEach((line) => {
            if (line.trim()) {
                const [name, role , barateing , borating] = line.split(',').map((x) => x.trim());
                teamArray.push({ name, role, barateing , borating });
            }
        });
        console.log(`${teamName} loaded successfully!`);
    };

    reader.readAsText(file);
}

function startInnings() {
    document.getElementById('vurses').textContent = `${teamnames.teamA} VS ${teamnames.teamB}`
    ballsBowled = 0;
    teamWickets = 0;

    currentBattingTeam = sortTeamByRole(currentInnings === 1 ? team1 : team2);
    currentBowlingTeam = currentInnings === 1 ? team2 : team1;

    striker = currentBattingTeam.shift();
    nonStriker = currentBattingTeam.shift();
    bowlerQueue = currentBowlingTeam.filter((player) => player.role !== 'Opener');
    bowler = rotateBowler();

    initializeStats();
    updateUI();
    document.querySelector('.scoring-section').classList.remove('hidden');
}

function initializeStats() {
    [...team1, ...team2].forEach((player) => {
        batsmanStats[player.name] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
    });
    [...team1, ...team2].forEach((player) => {
        if (player.role !== 'Opener') {
            bowlerStats[player.name] = { overs: 0, runs: 0, wickets: 0 };
        }
    });
}

function scoreRun(runs) {
    ballsBowled++;
    updateBatsmanStats(runs);
    updateBowlerStats(runs);
    document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' ' + runs
    if (currentInnings === 1) {
        team1Score += runs;
    } else {
        team2Score += runs;
    }

    if (runs % 2 !== 0) {
        [striker, nonStriker] = [nonStriker, striker];
    }
    if (ballsBowled % 6 == 0){
        overhasended()
    }

    if (ballsBowled >= maxBalls || teamWickets >= 10) {
        endInnings();
        return;
    }

    updateUI();
}

function recordDotBall() {
    scoreRun(0)
    if (ballsBowled >= maxBalls) {
        endInnings();
        return;
    }

    updateUI();
}

function recordWicket() {
    teamWickets++;
    bowlerStats[bowler.name].wickets++;
    
    if (currentBattingTeam.length > 0) {
        striker = currentBattingTeam.shift();
    }

    if (teamWickets >= 10 || ballsBowled >= maxBalls) {
        endInnings();
        return;
    }

    updateUI();
}

function updateBatsmanStats(runs) {
    const batsman = batsmanStats[striker.name];
    batsman.runs += runs;
    batsman.balls++;
    if (runs === 4) batsman.fours++;
    if (runs === 6) batsman.sixes++;
}

function updateBowlerStats(runs) {
    bowlerStats[bowler.name].runs += runs;
    if (ballsBowled % 6 === 0) {
        bowlerStats[bowler.name].overs++;
    }

    if (currentInnings === 2) {
        runsNeeded = team1Score - team2Score + 1;
        const ballsLeft = maxBalls - ballsBowled;
        document.getElementById('target').textContent = `Target: ${runsNeeded} runs from ${ballsLeft} balls`;

        if(runsNeeded<1){
            determineWinner()
        }
    }
}

function endInnings() {
    if (currentInnings === 1) {
        currentInnings++;
        startInnings();
        dancingelemrnt = document.getElementById('target')
        dancingelemrnt.classList.remove("hidden")
    } else {
        determineWinner();
    }
    
}

function determineWinner() {
        diff = team1Score - team2Score
        difw = 10 - teamWickets
        if(team1Score > team2Score){
            document.getElementById('ending').textContent=`${teamnames.teamA} won by ` + diff +' Runs'
        }
        else if(team2Score > team1Score){
            document.getElementById('ending').textContent=`${teamnames.teamB} won by ` + difw +' Wickets'
        }
        else{
            document.getElementById('ending').textContent="It's a Tie!"

        }
        clearInterval(intervalId); // Stops the interval
    
}

function rotateBowler() {
    let nextBowler;
    do {
        nextBowler = bowlerQueue.shift();
        bowlerQueue.push(nextBowler);
    } while (nextBowler === previousBowler);

    previousBowler = bowler;
    bowler = nextBowler;
    return nextBowler;
}

function changeEnds() {
    [striker, nonStriker] = [nonStriker, striker];
}

function updateOvers() {
    ballsBowled = Math.floor(ballsBowled / 6) * 6; // Reset balls for new over
    
    updateUI();
}

function sortTeamByRole(team) {
    return [
        ...team.filter((p) => p.role === 'Opener'),
        ...team.filter((p) => p.role === 'All-Rounder'),
        ...team.filter((p) => p.role === 'Bowler'),
    ];
}

function updateUI() {
    score = currentInnings === 1 ? team1Score : team2Score;
    document.getElementById('teamScore').textContent = score;
    document.getElementById('teamWickets').textContent = teamWickets;
    document.getElementById('crr').textContent = runrate.toFixed(2);
    document.getElementById('rrr').textContent = requiredrunrate.toFixed(2);

    document.getElementById('striker').textContent = striker.name
    document.getElementById('strikerstats').textContent = `(${batsmanStats[striker.name].runs} r, ${batsmanStats[striker.name].balls} b,${batsmanStats[striker.name].fours} F, ${batsmanStats[striker.name].sixes},s)`;
     
    document.getElementById('nonStriker').textContent = nonStriker.name 
    document.getElementById('nonstrikerstats').textContent = `(${batsmanStats[nonStriker.name].runs} r, ${batsmanStats[nonStriker.name].balls} b ,${batsmanStats[nonStriker.name].fours} F, ${batsmanStats[nonStriker.name].sixes},s)`;
    document.getElementById('bowler').textContent = bowler.name 
    document.getElementById('bowlerstats').textContent = `(${bowlerStats[bowler.name].overs} o, ${bowlerStats[bowler.name].runs} r, ${bowlerStats[bowler.name].wickets} w)`;
    document.getElementById('oversBowled').textContent = `${Math.floor(ballsBowled / 6)}.${ballsBowled % 6}`;
}

//generating a random score
function generaterandomscore() {

strikerrathing = Number(striker.barateing)
bowlerrating = Number(bowler.borating)
leadingcoefficient = strikerrathing - bowlerrating

max = 200 + Math.abs(leadingcoefficient)
scorevaluerandom = Math.floor(Math.random() * (max+1));
console.log(scorevaluerandom)
currentstate = 1
// 1 is normal
//0 is defencive
// 2 is attaking 
// 3 is superattacking


if (ballsBowled%6==0){
    document.getElementById('overstat').textContent =  'This over :'
}
oversplayed = ballsBowled/6
overperwicket = overs/teamWickets
wicketsperover = teamWickets/oversplayed
expectedwicktes = wicketsperover * overs
oversleft = overs - oversplayed
wicketsleft = 11 - teamWickets
wicketsleftperoverleft = wicketsleft / oversleft
runrate = score / oversplayed
requiredrunrate = runsNeeded / oversleft

if(wicketsleftperoverleft>2||requiredrunrate>15){
    currentstate = 3
}
else if(expectedwicktes<7 || requiredrunrate>10){
    currentstate = 2
}
else if(expectedwicktes>10){
    currentstate = 0
}
else{
    currentstate = 1
}

if(leadingcoefficient>0){
    
    switch (currentstate){
        case 0:
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 80 :
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150 :
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                recordDotBall()
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                recordDotBall()
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(1)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(2)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 197:
                recordDotBall()
                break;
            case scorevaluerandom >= 198 && scorevaluerandom <= 200:
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                recordDotBall()
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        scoreRun(6)
                        break;
                    case 1:
                        scoreRun(1)
                        break;
                    case 2:
                        scoreRun(2)
                        break;
                    case 3:
                        scoreRun(3)
                        break;
                    case 4:
                        scoreRun(4)
                        break;
                }
                }
        break;

        case 1:
            
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 80 :
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150 :
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                scoreRun(2)
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                scoreRun(3)
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(4)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(6)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 200:
               
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                recordDotBall()
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        scoreRun(6)
                        break;
                    case 1:
                        scoreRun(1)
                        break;
                    case 2:
                        scoreRun(2)
                        break;
                    case 3:
                        scoreRun(3)
                        break;
                    case 4:
                        scoreRun(4)
                        break;

                }

        
    }
        break;
        case 2:
            
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 10 :
                recordDotBall()
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                break;
            case scorevaluerandom >= 11 && scorevaluerandom <= 80:
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150 :
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                scoreRun(4)
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                scoreRun(6)
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(4)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(6)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 200:
               
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + 'W'
                recordDotBall()
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        scoreRun(6)
                        break;
                    case 1:
                        scoreRun(1)
                        break;
                    case 2:
                        scoreRun(2)
                        break;
                    case 3:
                        scoreRun(3)
                        break;
                    case 4:
                        scoreRun(4)
                        break;

                }

        
    }
    break;
    case 3:
            
            rem = scorevaluerandom % 5
           if (scorevaluerandom<=200){
            switch (rem){
                case 0:
                    recordDotBall()
                    recordWicket()
                    document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                    break;
                case 1:
                    scoreRun(0)
                    break;
                case 2:
                    scoreRun(1)
                    break;
                case 3:
                    scoreRun(4)
                    break;
                case 4:
                    scoreRun(6)
                    break;

            }
            
           }
           else{
            switch (rem){
                case 0:
                    scoreRun(6)
                    break;
                case 1:
                    scoreRun(1)
                    break;
                case 2:
                    scoreRun(2)
                    break;
                case 3:
                    scoreRun(3)
                    break;
                case 4:
                    scoreRun(4)
                    break;
           }
        }
    

}
   
}

else{
    switch (currentstate){
        case 0:
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 80 :
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150 :
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                recordDotBall()
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                recordDotBall()
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(1)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(2)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 197:
                recordDotBall()
                break;
            case scorevaluerandom >= 198 && scorevaluerandom <= 200:
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                recordDotBall()
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        recordDotBall()
                        recordWicket()
                        document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                        break;
                    case 1:
                        scoreRun(0)
                        break;
                    case 2:
                        scoreRun(0)
                        break;
                    case 3:
                        scoreRun(0)
                        break;
                    case 4:
                        scoreRun(0)
                        break;
               }
                }
        break;

        case 1:
            
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 80 :
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150 :
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                scoreRun(2)
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                scoreRun(3)
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(4)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(6)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 200:
               
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                recordDotBall()
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        recordDotBall()
                        recordWicket()
                        document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                        break;
                    case 1:
                        scoreRun(0)
                        break;
                    case 2:
                        scoreRun(0)
                        break;
                    case 3:
                        scoreRun(0)
                        break;
                    case 4:
                        scoreRun(0)
                        break;
               }

        
    }
        break;
        case 2:
            
        switch (true){
            case scorevaluerandom >= 0 && scorevaluerandom <= 10 :
                recordDotBall()
                recordWicket()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                break;
            case scorevaluerandom >= 11 && scorevaluerandom <= 80 :
                recordDotBall()
                break;
            case scorevaluerandom >= 81 && scorevaluerandom <= 150:
                scoreRun(1)
                break;
            case  scorevaluerandom >= 151 && scorevaluerandom<= 175:

                scoreRun(4)
                break;
            case scorevaluerandom >= 176 && scorevaluerandom <= 178:
                scoreRun(6)
                break;
            case scorevaluerandom >= 179 && scorevaluerandom <=188:
                scoreRun(4)
                break;
            case scorevaluerandom >= 189 && scorevaluerandom <= 193:
                scoreRun(6)
                break;
            case scorevaluerandom >= 194 && scorevaluerandom<= 200:
               
                recordWicket()
                recordDotBall()
                document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                break;
            case scorevaluerandom > 200:
                rem = scorevaluerandom % 6
                switch (rem){
                    case 0:
                        recordDotBall()
                        recordWicket()
                        document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                        break;
                    case 1:
                        scoreRun(0)
                        break;
                    case 2:
                        scoreRun(0)
                        break;
                    case 3:
                        scoreRun(0)
                        break;
                    case 4:
                        scoreRun(0)
                        break;
               }

        
    }
    break;
    case 3:
            
            rem = scorevaluerandom % 5
           if (scorevaluerandom<=200){
            switch (rem){
                case 0:
                    recordDotBall()
                    recordWicket()
          document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                    break;
                case 1:
                    scoreRun(0)
                    break;
                case 2:
                    scoreRun(1)
                    break;
                case 3:
                    scoreRun(4)
                    break;
                case 4:
                    scoreRun(6)
                    break;

            }
            
           }
           else{
            switch (rem){
                case 0:
                    recordDotBall()
                    recordWicket()
                     document.getElementById('overstat').textContent = document.getElementById('overstat').textContent + ' W'
                    break;
                case 1:
                    scoreRun(0)
                    break;
                case 2:
                    scoreRun(0)
                    break;
                case 3:
                    scoreRun(0)
                    break;
                case 4:
                    scoreRun(0)
                    break;
           }
        }
    

}
   
}
}

let intervalId;

document.getElementById("startButton").addEventListener("click", function() {
    intervalId = setInterval(function() {
        generaterandomscore();
        // Place your code here to run every second
    }, 1000); // 1000 milliseconds = 1 second
});

document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(intervalId); // Stops the interval
});
