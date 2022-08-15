const getRandomAnswer = (size, n) => {
  const res = [];
  for (let i = 0; i < n; i++) {
    //Math.floor(num) 대체 num | 0
    const randomElement = (Math.random() * size) | 0;
    res.push(randomElement);
  }
  return res;
};

const showAnswer = async (answers) => {
  for (let answer of answers) {
    const selector = "[data-num='" + answer + "']";
    const activeBlock = document.querySelector(selector);

    const colorRightBlock = new Promise((resolve) => {
      setTimeout(() => {
        activeBlock.className = "block block-right";
        setTimeout(() => {
          activeBlock.className = "block";
          resolve();
        }, 1000);
      }, 1000);
    });

    await colorRightBlock;
  }

  return;
};

function Game(count) {
  const state = {
    score: 0,
    highScore: localStorage.getItem("memory-game-score") ?? 0,
    answer: getRandomAnswer(count, 1),
    index: 0,
  };

  const blockContainer = document.querySelector("#block-container");
  const startButton = document.querySelector("#start-button");
  const scoreContainer = document.querySelector("#score-container");

  //init block
  for (let i = 0; i < count; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.dataset.num = i;

    blockContainer.appendChild(block);
  }

  const handleBlockClick = (e) => {
    const selectedBlock = e.target;
    if (Number(selectedBlock.dataset.num) === state.answer[state.index]) {
      selectedBlock.className = "block block-right";
      state.index += 1;
    } else {
      selectedBlock.className = "block block-wrong";
      blockContainer.className = "shake";

      //init score
      state.score = 0;
      showScore();
      startButton.disabled = false;
    }

    setTimeout(() => {
      selectedBlock.className = "block";
      blockContainer.classList.remove("shake");
      setTimeout(() => {
        checkIndexAndScoreUp();
      }, 1000);
    }, 1000);
  };

  blockContainer.addEventListener("click", handleBlockClick);

  //init score
  const score = document.createElement("div");
  const highScore = document.createElement("div");

  const showScore = () => {
    score.innerText = "Score:" + state.score;
    highScore.innerText = "High Score:" + state.highScore;
  };

  showScore();

  scoreContainer.appendChild(score);
  scoreContainer.appendChild(highScore);

  const handleStart = async () => {
    startButton.disabled = true;
    state.answer = getRandomAnswer(count, state.score + 1);
    state.index = 0;

    await showAnswer(state.answer);
  };

  //init button
  startButton.addEventListener("click", handleStart);

  const checkIndexAndScoreUp = () => {
    if (state.score + 1 === state.index) {
      console.log("hi");
      state.score += 1;
      state.highScore = Math.max(state.highScore, state.score);
      showScore();
      handleStart();
    }
  };

  //save high score at local storage -> do not work...
  window.addEventListener("onbeforeunload", (e) => {
    e.preventDefault();
    const prevHighScore = localStorage.getItem("memory-game-score") ?? 0;
    if (state.highScore > prevHighScore) {
      localStorage.setItem("memory-game-score", state.highScore);
    }
    return "";
  });
}
