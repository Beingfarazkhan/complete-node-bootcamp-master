const Tour = require('./../models/tourModel');

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

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
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
      message: 'Invalid Data sent',
    });
  }
};

exports.updateTour = async (req, res) => {
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
};

exports.deleteTour = async (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
