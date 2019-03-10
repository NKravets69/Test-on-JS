window.onload = function() {
  let result = {};
  let step = 0;

  function showQuestion(questionNumber) {
    document.querySelector(".question").innerHTML = quiz[step]["q"];
    let answer = "";
    for (let key in quiz[step]["a"]) {
      answer += `<li data-v="${key}"class="answer-variant">${
        quiz[step]["a"][key]
      }</li>`;
    }
    document.querySelector(".answer").innerHTML = answer;
    showQuizCounter();
  }
  document.onclick = function(event) {
    event.stopPropagation();
    if (
      event.target.classList.contains("answer-variant") &&
      step < quiz.length
    ) {
      //event.target.data;
      if (result[event.target.dataset.v] != undefined) {
        result[event.target.dataset.v]++;
      } else {
        result[event.target.dataset.v] = 0;
      }
      step++;
      if (step == quiz.length) {
        document.querySelector(".question").remove();
        document.querySelector(".answer").remove();
        showResult();
      } else {
        showQuestion(step);
      }
    }
    console.log(result);
  };

  function showResult() {
    let key = Object.keys(result).reduce(function(a, b) {
      return result[a] > result[b] ? a : b;
    });
    console.log(key);

    let div = document.createElement("div");
    div.classList.add("result");
    div.innerHTML = answers[key]["description"];
    document.querySelector("main").appendChild(div);
    clearQuizCounter();
  }

  function showQuizCounter() {
    const textCouner = `<h3>${step + 1} из ${quiz.length}</h3>`;
    document.getElementsByClassName("quiz-counter")[0].innerHTML = textCouner;
  }

  function clearQuizCounter() {
    document.getElementsByClassName("quiz-counter")[0].innerHTML = "";
  }

  showQuestion(step);
};
