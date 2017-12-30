import Hero from './hero.js';
import Monster from './monster.js';


var hero = new Hero("Ironman", 100, 30);
var monster = new Monster("Ghost", 60, 10);
var rounds = 10;

function isGameOver() {
  //更新回合數，並檢查是否回合結束
  rounds--;
  var roundElement = document.getElementById("round-num");
  roundElement.innerHTML = rounds;

  return (rounds == 0 || !hero.isAlive() || !monster.isAlive());
}

function finish() {
  //P5 顯示dialog
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.isAlive() == false) {
    dialog.classList.add("win")
  } else if (hero.isAlive() == false) {
    dialog.classList.add("lose")
  }
}

function heroAttack(i) {
  // Hero 選技能時觸發回合開始
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function() {
    // Hero 攻擊
    // Hero 移動動畫 css class
    hero.element.classList.add("attacking");
    setTimeout(function() {
      hero.attack(monster, i);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100)

  setTimeout(function() {
    // Monster 攻擊
    // Monster 移動動畫 css class
    if (monster.isAlive()){
      monster.element.classList.add("attacking")
      setTimeout(function() {
        monster.attack(hero, 1);
        monster.element.classList.remove("attacking");
        //monster 攻擊完檢查是否回合結束
        if (isGameOver() == true) {
          finish();
        } else {
          //新回合打開Hero skill
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500);
    } else {
      //Monster 陣亡
      finish();
    }
  }, 1000)

}

function addSkillEvent() {
  //加入skill click listener
  var skill1 = document.getElementById("skill1");
  skill1.addEventListener("click", function() { heroAttack(1); })

  var skill2 = document.getElementById("skill2");
  skill2.addEventListener("click", function() { heroAttack(2); })

  var skill3 = document.getElementById("skill3");
  skill3.addEventListener("click", function() { heroAttack(3); })
}

addSkillEvent();
