import Hero from './hero.js';
import Monster from './monster.js';


var hero = new Hero("Ironman", 100, 30);
var monster = new Monster("Ghost", 60, 10);
var rounds = 10;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function isGameOver() {
  var roundElement = document.getElementById("round-num");
  roundElement.innerHTML = rounds;
  
  return rounds != 0 && hero.isAlive() && monster.isAlive()
}

function heroAttack(i) {

  setTimeout(function() { hero.attack(monster, i); }, 100)
  setTimeout(function() { monster.attack(hero, 1); }, 500)
  rounds--;

  isGameOver();
}

function addSkillEvent() {
  var skill1 = document.getElementById("skill1");
  skill1.addEventListener("click", function() { heroAttack(1); })

  var skill2 = document.getElementById("skill2");
  skill2.addEventListener("click", function() { heroAttack(2); })

  var skill3 = document.getElementById("skill3");
  skill3.addEventListener("click", function() { heroAttack(3); })
}

addSkillEvent();
