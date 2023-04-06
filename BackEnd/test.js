const express = require('express');
const fetch = require('node-fetch');
const app = express();

const scopes = 'personel,student,templecturer'; // <----- Scopes for search account type
const token='sfDdrmyUDe9mzuNA0APClmJDtI5rh-EF';

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fetch('https://api.account.kmutnb.ac.th/api/account-api/user-authen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify({
      scopes: scopes,
      username: username,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(json_data => {
      if (!json_data.hasOwnProperty('api_status')) {
        res.status(500).json({ message: 'API Error' });
      } else if (json_data['api_status'] === 'success') {
        res.json({ userInfo: json_data['userInfo'] });
      } else if (json_data['api_status'] === 'fail') {
        res.status(401).json({ message: json_data['api_message'] });
      } else {
        res.status(500).json({ message: 'Internal Error' });
      }
    })
    .catch(error => {
      console.log('Fetch Error: ' + error);
      res.status(500).json({ message: 'Fetch Error' });
    });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
