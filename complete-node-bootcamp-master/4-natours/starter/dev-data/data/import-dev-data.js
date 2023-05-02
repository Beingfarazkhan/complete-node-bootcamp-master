const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../../config.env' });

const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connectDB = async function () {
  return await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};
connectDB().then(() => {
  console.log('DB connection successful');
});

const tours = JSON.parse(
  fs.readFileSync(`./tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfuly loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all Data from Collection
const deleteData = async () => {
  try {
    const done = await Tour.deleteMany();
    console.log(done);
    console.log('data successfuly deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

setTimeout(() => {
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
}, 10000);
