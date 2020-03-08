const fs = require("fs");
const path = require("path");

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
    //   const rooti= fs.readdirSync('/Downloads/peliculas');
    let response = [];
    response.push(recFindByExt("/Downloads/peliculas", "mp4"));
    if (response.length >= 1) {
      response.push(recFindByExt("/Downloads/peliculas", "mkv"));
    }
    response = response[0].concat(response[1]);
    let lis = ``;
    const preg= new RegExp(`\\Downloads`,'g');
    const back= new RegExp(`\/`,'g');
    response.forEach(element => {
      const spliti = element.split("\\");
      const last = spliti.length - 1;
      console.log(`element`,element);
      console.log(`preg.test(element)`,preg.test(element));
      let realLink = element.replace(/\\/g,"/");
      // realLink = element.replace(/\/Downloads\/peliculas/g,"http://127.0.0.1/peliculas/");
      // realLink = element.replace(back,'/');
      lis += `<li><a href="${realLink}">${spliti[last]}</a></li>`;
    });

    let ind = fs.readFileSync("./src/template.html", "utf8");
    ind = ind.replace("#movie-list#", lis);
    fs.writeFileSync("./src/index.html", ind, "utf8");

    // console.log(`rooti`, response);
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
