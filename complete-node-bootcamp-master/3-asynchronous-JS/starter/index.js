const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file💀");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not find the file💀");
      resolve("Success");
    });
  });
};

// Async Await Method :

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro("dog-image.txt", res.body.message);
    console.log("Random Dog Image Saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2 : Ready Dog 🐶";
};

// Using async await :
(async () => {
  try {
    console.log("1 : Starting to get Dog pics 🐶");
    const x = await getDogPic();
    console.log(x);
    console.log("3 : Done getting Dog pics 🐶");
  } catch (err) {
    console.log(err);
  }
})();

// Using promises :
// console.log("1 : Starting to get Dog pics 🐶");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3 : Done getting Dog pics 🐶");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Chaining promises :
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-image.txt", res.body.message);
  })
  .then(() => {
    console.log("Random Dog Image Saved to file");
  })
  .catch((err) => {
    console.log(err);
  });
  */

// Callback Hell :
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile("dog-image.txt", res.body.message, (err, data) => {
        console.log("Random Dog Image Saved to file");
      });
    });
});
 
// Then Method : 
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-image.txt", res.body.message, (err, data) => {
        if (err) return console.log(err.message);
        console.log("Random Dog Image Saved to file");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/
