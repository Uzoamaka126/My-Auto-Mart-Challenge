/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import routes from './routes/routes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors);

app.get('/', (req, res) => {
  res.json('Welcome to AutoMart');
});

app.use('/api/v1/', routes);

app.use('*', (req, res) => res.status(404).json({
  status: 'Not Found',
  message: 'This route does not exist',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Welcome to Auto-Mart'));

export default app;
