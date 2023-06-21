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

