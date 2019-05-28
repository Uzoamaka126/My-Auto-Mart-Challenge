/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const app = express();

// const cors = require('cors');

app.use(bodyParser.json({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json('Welcome to AutoMart');
});

app.use('/api/v1/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Welcome to Auto-Mart'));

export default app;
