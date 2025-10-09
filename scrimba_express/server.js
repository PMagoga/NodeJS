import express from 'express';

const celebrity = {
  name: 'Tom Cruise',
  age: 58,
  netWorth: '$600 million',
  famousMovie: 'Top Gun',
};

const app = express();
const PORT = 8000;

app.get('/api', (req, res) => {
  res.json(celebrity);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});