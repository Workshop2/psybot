var fs = require("fs");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        if(!curPath.includes("config")) {
          deleteFolderRecursive(curPath);
        }
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
};

console.log("Cleaning working tree...");

try {
    deleteFolderRecursive("build");
}
catch(e){}

console.log("Successfully cleaned working tree!");

if (!fs.existsSync("build")){
  fs.mkdirSync("build");
}

if (!fs.existsSync(".\\build\\config")){
  fs.mkdirSync(".\\build\\config");
}

if (!fs.existsSync(".\\build\\config\\config.js")){
  fs.copyFile(
    ".\\config\\config.default.js",
    ".\\build\\config\\config.js",
    () => {})
}