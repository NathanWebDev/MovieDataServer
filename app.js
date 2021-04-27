require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./moviedex-data.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validateBearerToken(req, res, next){
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
         return res.status(401).json({ error: 'Unauthorized request' })
  }
  
  next();
});

app.get('/movie', function getMovies(req, res){
  let data = MOVIES;

  if(req.query.genre) {
    data = data.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if(req.query.country) {
    data = data.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if(req.query.avg_vote) {
    data = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)  
    )
  }

});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});