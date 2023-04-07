const express = require('express');
const morgan = require('morgan');

// Importing routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//////////////////////////////////////////////////////////
/////////  MIDDLEWARES  ///////////////////////////////////////////
//////////////////////////////////////////////////////////
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Serving static files from folder
app.use(express.static(`${__dirname}/public`));

// Our own middleware
app.use((req, res, next) => {
  console.log('Hello from our middleware 👋...');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////////////////////////
////////  ROUTES  ///////////////////////////////////////////
//////////////////////////////////////////////////////////

// app.get('/api/v1/tours', getAllTours);
// Optional Parameters app.get('/api/v1/tours/:id/:var/:x?' -> x is optional parameter
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//////////  TOURS  //////////////////////

app.use('/api/v1/tours', tourRouter);

//////////  USERS  /////////////////////

app.use('/api/v1/users', userRouter);

// Exporting app to use in server.js
module.exports = app;
