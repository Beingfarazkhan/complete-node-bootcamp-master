const fs = require("fs");
const superagent = require("superagent");

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
 */

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
