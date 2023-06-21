import './style.css';

const postData = async (data) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ItduN06lGeQQJxOUfeGI/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = document.getElementById('user-name').value;
  const userScore = document.getElementById('user-score').value;
  const form = document.getElementById('form');
  const data = {
    user: userName,
    score: userScore,
  };

  postData(data);
  form.reset();
});

const getData = async () => {
  const dataFromApi = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ItduN06lGeQQJxOUfeGI/scores/');
  const result = await dataFromApi.json();
  return result;
};

const renderScores = () => {
  const scoreList = document.getElementById('player-scores');
  getData().then((data) => {
    data.result.sort((a, b) => b.score - a.score).forEach((element) => {
      const li = document.createElement('li');
      li.innerHTML = `${element.user}: ${element.score}`;
      li.className = 'list-unstyled fs-5 fw-bold p-1 text-center';
      scoreList.appendChild(li);
    });
  });
};

const refreshBtn = document.getElementById('refresh-btn');
refreshBtn.addEventListener('click', () => {
  const scoreList = document.getElementById('player-scores');
  scoreList.innerHTML = '';
  renderScores();
});

renderScores();