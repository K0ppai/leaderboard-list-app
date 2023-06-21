import './style.css';

const userName = document.getElementById('user-name').value;
const userScore = document.getElementById('user-score').value;
const form = document.getElementById('form');

// write a function to create a new game session in the api
// const createGame = async () => {
//   const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name: 'My Game' }),
//   });
//   const result = await response.json();
//   return result;
// };
// console.log(createGame());

const postData = async (data) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WlVM9CvTah0g13740Hwy/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const validateScore = () => {
  const regex = /^[0-9]+$/;
  if (!userScore.match(regex)) {
    const userScore = document.getElementById('user-score');
    document.getElementById('invalid').innerHTML = 'Please enter numbers only';
    userScore.style.border = '4px solid red';
  }
};

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const data = {
    user: userName,
    score: userScore,
  };

  if (validateScore()) {
    postData(data);
    form.reset();
  }
});

// write a function to get the data from the API and return the result array
const getData = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WlVM9CvTah0g13740Hwy/scores/');
  const json = await response.json();
  return json.result;
};

// write a function to sort the result from getData in descending order
const sortScores = async () => {
  const data = await getData();
  data.sort((a, b) => {
    if (a === 0 && b !== 0) {
      return 1;
    } if (a !== 0 && b === 0) {
      return -1;
    }
    return b - a;
  });
  return data;
};
sortScores();

console.log(sortScores());

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
