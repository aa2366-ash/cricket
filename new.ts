const runs = [0,1,2,4,6];
let btn1=document.getElementById('CSK') as HTMLButtonElement;
btn1.disabled = true;
let btn2=document.getElementById('MI') as HTMLButtonElement;
btn2.disabled = true;
let resultbtn=document.getElementById('result') as HTMLButtonElement;
resultbtn.disabled=true;
let startbtn=document.getElementById('start') as HTMLButtonElement;
let flag=1;
let intervalId;
let playarray1=['SURESH RAINA',"MS DHONI","DWAYNE BRAVO","RAVINDRA JADEJA","FAF DU PLESSIS","MURALI VIJAY","SAM CURRAN","SHANE WATSON","MITCHELL SATNER","LUNGI NIGIDI"];
let playarray2=["ROHIT SHARMA","HARDIK PANDYA","JASPRIT BUMRAH","KIERON POLLARD","LASITH MALINGA","TRENT BOULT","SURYA KUMAR YADAV","CHIRS LYNN","ISHAN KISHAN","KRUNAL PANDYA"];
// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("result");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  generate();
}
let element: HTMLElement = document.getElementById('span') as HTMLElement;
element.onclick=function(){
// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

class Team
{
    
     totalScore: number=0
     overScore :number[] = []
     score: number = 0;
     over: number=1
     playerArray: string[]=[]
     no_of_balls: number = 1;
     constructor(public teamname:string)
    {
        this.teamname=teamname;
    }
    createPlayer(name:string){
        this.playerArray.push(name)

    }
    hit(){
        let run=runs[Math.floor(Math.random() * runs.length)];
       // console.log("runs",run)
        this.score += run
       // this.score.push(run);
        this.totalScore += run;
        
        console.log("ball",this.no_of_balls)
        console.log("score",this.score)

        this.displayrun(run,this.score,this.over,this.teamname);
        if(run==0 || this.no_of_balls > 5 ){
            this.over++;
            this.overScore.push(this.score)
            console.log("Overendscore",this.overScore)
            this.score = 0;
            this.no_of_balls = 0 

        }
       
        if (this.over > 10){
            btn1.disabled = true;
            btn2.disabled = true;
            clearInterval(intervalId)
            let myContainer :any;
            myContainer = document.getElementById('timer_value') as HTMLParagraphElement;
            myContainer.innerHTML = "  ";
            flag++;
            if(flag >= 3)
            resultbtn.disabled=false;

        }
        this.no_of_balls++;
    }
    displayrun(current_val,score,over,name): void {
        document.getElementById(String(name+over)).innerHTML+=String(current_val)+"&nbsp;";
        document.getElementById(String(name+"t"+over)).innerHTML=String(score);
       }
    settimer(counter:number) {
           startbtn.disabled=true;
           if(flag==1)
           {
            btn1.disabled = false;
            //flag=2;
           }
           else{
               btn2.disabled=false;

           }
        intervalId = setInterval(() => {
            counter = counter - 1;
            let myContainer :any;
            if(flag==1)
            {
            myContainer = document.getElementById('timer_value') as HTMLParagraphElement;
            myContainer.innerHTML = String(counter);
            }
            else{
                myContainer = document.getElementById('timer_value1') as HTMLParagraphElement;
                myContainer.innerHTML = String(counter);  
            }
            if(counter === 0)
            {
            startbtn.disabled=false;
            btn1.disabled = true;
            btn2.disabled = true;
            clearInterval(intervalId)
            flag++
            if(flag>=3)resultbtn.disabled=false;
            }
        }, 1000)
    }
    }


let team1=new Team("CSK");
let team2 = new Team("MI");

function generate() {
    if(team1.totalScore>team2.totalScore)
    {

        let arrayMaxIndex = function(array) {
            return array.indexOf(Math.max.apply(null, array));
          };
        let a1=(arrayMaxIndex(team1.overScore)); 
        let a=team1.totalScore-team2.totalScore;
        let p=document.getElementById("line1") as HTMLParagraphElement
        p.innerHTML=`CSK WON THE MATCH BY ${a}RUNS`;
        p=document.getElementById("line2") as HTMLParagraphElement
        p.innerHTML=`MAN OF THE MATCH :${playarray1[a1]} TOTAL RUNS :${team1.overScore[a1]}`
        let im=document.getElementById("popup_img") as HTMLImageElement
        im.src="https://english.cdn.zeenews.com/sites/default/files/2018/05/29/690335-csk.jpg";
    }
    else if(team1.totalScore<team2.totalScore)
    {
        let arrayMaxIndex = function(array) {
            return array.indexOf(Math.max.apply(null, array));
          };
        let a1=(arrayMaxIndex(team2.overScore)); 
        let a=team2.totalScore-team1.totalScore;
        let p=document.getElementById("line1") as HTMLParagraphElement
        p.innerHTML=`MI WON THE MATCH BY ${a}RUNS`;
        p=document.getElementById("line2") as HTMLParagraphElement
        p.innerHTML=`MAN OF THE MATCH :${playarray2[a1]} TOTAL RUNS :${team2.overScore[a1]}`
       let  im=document.getElementById("popup_img") as HTMLImageElement
        im.src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/06/02/577434-22pti-pti5222017000013b.jpg";
    }
    else if(team1.totalScore==team2.totalScore)
    { 
        let p=document.getElementById("line1") as HTMLParagraphElement
        p.innerHTML=`THE MATCH IS TIED`;
        let  im=document.getElementById("popup_img") as HTMLImageElement
        im.src="https://nagalandpage.com/wp-content/uploads/2019/04/Mumbai-Indians-beat-Dhoni.jpg";   
}
}





