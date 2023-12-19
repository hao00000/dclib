var package = require("./package.json");

if (process.argv[2] === "name") {
  var name = package.name;
  var index = name.indexOf("/");
  name = name.substring(++index, name.length);
  console.log(name);
}

if (process.argv[2] === "version") console.log(package.version);
