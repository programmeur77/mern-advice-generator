import dotenv from 'dotenv/config';
import express from 'express';

import userRoutes from './routes/user-routes.js';
import adviceRoutes from './routes/advice-routes.js';

import dbConnect from './config/db.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTION, PATCH, UPDATE'
  );
  next();
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/advice', adviceRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
  dbConnect();
});
