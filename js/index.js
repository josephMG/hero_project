import Hero from './hero.js';
import Monster from './monster.js';


var hero = new Hero("Ironman", 100, 30);
var monster = new Monster("Ghost", 60, 10);
var rounds = 10;

function isGameOver() {
  rounds--;
  var roundElement = document.getElementById("round-num");
  roundElement.innerHTML = rounds;

  return rounds != 0 && hero.isAlive() && monster.isAlive()
}

function heroAttack(i) {
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function() {
    console.log(hero)
    hero.element.classList.add("attacking");
    setTimeout(function() {
      hero.attack(monster, i);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100)

  setTimeout(function() {
    monster.element.classList.add("attacking")
    setTimeout(function() {
      monster.attack(hero, 1);
      monster.element.classList.remove("attacking")
    }, 500);
    if (isGameOver()) {
      document.getElementsByClassName("skill-block")[0].style.display = "block";
    }
  }, 1000)


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
