const { json } = require('express');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// const tours = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/../dev-data/data/tours-simple.json`
//   )
// );

//////  Middleware example :
// exports.checkId = (req, res, next, val) => {
//   console.log(`value of id is ${val}`);

//   if (+req.params.id > tours.length)
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   next();
// };
///////////// Mongoose Model will replace this :
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name && !req.body.price)
//     return res.status(400).json({
//       status: 'fail',
//       message:
//         'Invalid format, missing name or price properties',
//     });
//   next();
// };

//////////////////////////////////////////////////////////
////////  ROUTE HANDLERS  ///////////////////////////////////////////
//////////////////////////////////////////////////////////

exports.aliasTopTours = (req, res, next) => {
  (req.query.limit = '5'),
    (req.query.sort = '-ratingsAverage,price'),
    (req.query.fields =
      'name,price,ratingsAverage,summary,difficulty'),
    next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // BTS : Tour.findOne({ _id : req.params:id })
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stat = Tour.aggregate();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
};

/////////////////////////////////////////////////////////////////////
// IN getAllTours
// Building the query string
// 1A) Filtering
// const queryObj = { ...req.query };
// const excludedFields = [
//   'page',
//   'sort',
//   'limit',
//   'fields',
// ];

// excludedFields.forEach((el) => {
//   delete queryObj[el];
// });

// // 1B) Advance Filtering

// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(
//   /\b(gte|gt|lte|lt)\b/g,
//   (match) => `$${match}`
// );
// console.log(JSON.parse(queryStr));

// let query = Tour.find(JSON.parse(queryStr));

// 2) Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   console.log(sortBy);
//   query = query.sort(sortBy);
//   // sort('price ratingsAverage')
// } else {
//   query = query.sort('-ratingsAverage');
// }

// 3) Limiting fields
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// 4) Pagination
// const page = +req.query.page || 1;
// const limit = +req.query.limit || 100;
// const skip = (page - 1) * limit;

// console.log(page, limit, skip);
// //  page=2&limit=10
// query = query.skip(skip).limit(limit);
// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours)
//     throw new Error('The page does not exist');
// }
/////////////////////////////////////////////////////////////////////
