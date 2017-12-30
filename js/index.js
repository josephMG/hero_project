import Hero from './hero.js';
import Monster from './monster.js';


var hero = new Hero("Ironman", 100, 30);
var monster = new Monster("Ghost", 60, 10);
var rounds = 10;

function isGameOver() {
  rounds--;
  var roundElement = document.getElementById("round-num");
  roundElement.innerHTML = rounds;

  return (rounds == 0 || !hero.isAlive() || !monster.isAlive());
  if (rounds == 0 || !hero.isAlive() || !monster.isAlive()){
    document.getElementsByClassName("skill-block")[0].style.display = "block";
    return true
  }
  else {
    finish();
    return false;
  }
}

function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.isAlive() == false) {
    dialog.classList.add("win")
  } else if (hero.isAlive() == false) {
    dialog.classList.add("lose")
  }
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
    if (monster.isAlive()){
      monster.element.classList.add("attacking")
      setTimeout(function() {
        monster.attack(hero, 1);
        monster.element.classList.remove("attacking");
        if (isGameOver() == true) {
          finish();
        }
      }, 500);
    }
    if (isGameOver() == false) {
      document.getElementsByClassName("skill-block")[0].style.display = "block";
    } else {
      finish();
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
