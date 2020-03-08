const fs = require("fs");
const path = require("path");
const os = require("os");
const ifaces = os.networkInterfaces();

function recFindByExt(base, ext, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(function(file) {
    var newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}

function getMovies() {
  try {
    let response = [];
    response.push(recFindByExt("/Downloads/peliculas", "mp4"));
    if (response.length >= 1) {
      response.push(recFindByExt("/Downloads/peliculas", "mkv"));
    }
    response = response[0].concat(response[1]);
    let lis = ``;
    response.forEach(element => {
      const spliti = element.split("\\");
      const last = spliti.length - 1;
      let realLink = element.replace(/\\/g, "/");
      lis += `<li><a href="${realLink}">${spliti[last]}</a></li>`;
    });

    const ip = ifaces["Wi-Fi"].find(el => el.family == "IPv4").address;

    lis = lis.replace(/\/Downloads/g, "http://" + ip);

    let ind = fs.readFileSync("./src/template.html", "utf8");
    ind = ind.replace("#movie-list#", lis);
    fs.writeFileSync("./src/index.html", ind, "utf8");
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  try {
    fs.writeFileSync("./error/error.txt", error, "utf8");
    console.log(`error`, error);
  } catch (error) {
    console.log(error);
  }
}

getMovies();
