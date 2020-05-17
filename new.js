var runs = [0, 1, 2, 4, 6];
var x = document.getElementById("my_audio");
var btn1 = document.getElementById('CSK');
btn1.disabled = true;
var btn2 = document.getElementById('MI');
btn2.disabled = true;
var resultbtn = document.getElementById('result');
resultbtn.disabled = true;
var startbtn = document.getElementById('start');
var flag = 1;
var intervalId;
var playarray1 = ['SURESH RAINA', "MS DHONI", "DWAYNE BRAVO", "RAVINDRA JADEJA", "FAF DU PLESSIS", "MURALI VIJAY", "SAM CURRAN", "SHANE WATSON", "MITCHELL SATNER", "LUNGI NIGIDI"];
var playarray2 = ["ROHIT SHARMA", "HARDIK PANDYA", "JASPRIT BUMRAH", "KIERON POLLARD", "LASITH MALINGA", "TRENT BOULT", "SURYA KUMAR YADAV", "CHIRS LYNN", "ISHAN KISHAN", "KRUNAL PANDYA"];
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("result");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    generate();
};
var element = document.getElementById('span');
element.onclick = function () {
    // When the user clicks on <span> (x), close the modal
    //span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
var Team = /** @class */ (function () {
    function Team(teamname) {
        this.teamname = teamname;
        this.totalScore = 0;
        this.overScore = [];
        this.score = 0;
        this.over = 1;
        this.playerArray = [];
        this.no_of_balls = 1;
        this.teamname = teamname;
    }
    Team.prototype.createPlayer = function (name) {
        this.playerArray.push(name);
    };
    Team.prototype.hit = function () {
        var run = runs[Math.floor(Math.random() * runs.length)];
        // console.log("runs",run)
        this.score += run;
        // this.score.push(run);
        this.totalScore += run;
        console.log("ball", this.no_of_balls);
        console.log("score", this.score);
        this.displayrun(run, this.score, this.over, this.teamname);
        if (run == 0 || this.no_of_balls > 5) {
            this.over++;
            this.overScore.push(this.score);
            console.log("Overendscore", this.overScore);
            this.score = 0;
            this.no_of_balls = 0;
        }
        if (this.over > 10) {
            btn1.disabled = true;
            btn2.disabled = true;
            clearInterval(intervalId);
            var myContainer = void 0;
            myContainer = document.getElementById('timer_value');
            myContainer.innerHTML = "  ";
            flag++;
            if (flag >= 3)
                resultbtn.disabled = false;
        }
        this.no_of_balls++;
    };
    Team.prototype.displayrun = function (current_val, score, over, name) {
        document.getElementById(String(name + over)).innerHTML += String(current_val) + "&nbsp;";
        document.getElementById(String(name + "t" + over)).innerHTML = String(score);
    };
    Team.prototype.settimer = function (counter) {
        startbtn.disabled = true;
        if (flag == 1) {
            btn1.disabled = false;
            //flag=2;
        }
        else {
            btn2.disabled = false;
        }
        intervalId = setInterval(function () {
            counter = counter - 1;
            var myContainer;
            if (flag == 1) {
                myContainer = document.getElementById('timer_value');
                myContainer.innerHTML = String(counter);
            }
            else {
                myContainer = document.getElementById('timer_value1');
                myContainer.innerHTML = String(counter);
            }
            if (counter === 0) {
                startbtn.disabled = false;
                btn1.disabled = true;
                btn2.disabled = true;
                clearInterval(intervalId);
                flag++;
                if (flag >= 3)
                    resultbtn.disabled = false;
            }
        }, 1000);
    };
    return Team;
}());
var team1 = new Team("CSK");
var team2 = new Team("MI");
function generate() {
    if (team1.totalScore > team2.totalScore) {
        var arrayMaxIndex = function (array) {
            return array.indexOf(Math.max.apply(null, array));
        };
        var a1 = (arrayMaxIndex(team1.overScore));
        var a = team1.totalScore - team2.totalScore;
        var p = document.getElementById("line1");
        p.innerHTML = "CSK WON THE MATCH BY " + a + "RUNS";
        p = document.getElementById("line2");
        p.innerHTML = "MAN OF THE MATCH :" + playarray1[a1] + " TOTAL RUNS :" + team1.overScore[a1];
        var im = document.getElementById("popup_img");
        im.src = "https://english.cdn.zeenews.com/sites/default/files/2018/05/29/690335-csk.jpg";
    }
    else if (team1.totalScore < team2.totalScore) {
        var arrayMaxIndex = function (array) {
            return array.indexOf(Math.max.apply(null, array));
        };
        var a1 = (arrayMaxIndex(team2.overScore));
        var a = team2.totalScore - team1.totalScore;
        var p = document.getElementById("line1");
        p.innerHTML = "MI WON THE MATCH BY " + a + "RUNS";
        p = document.getElementById("line2");
        p.innerHTML = "MAN OF THE MATCH :" + playarray2[a1] + " TOTAL RUNS :" + team2.overScore[a1];
        var im = document.getElementById("popup_img");
        im.src = "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/06/02/577434-22pti-pti5222017000013b.jpg";
    }
    else if (team1.totalScore == team2.totalScore) {
        var p = document.getElementById("line1");
        p.innerHTML = "THE MATCH IS TIED";
        var im = document.getElementById("popup_img");
        im.src = "https://nagalandpage.com/wp-content/uploads/2019/04/Mumbai-Indians-beat-Dhoni.jpg";
    }
}
