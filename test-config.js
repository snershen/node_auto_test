const chokidar = require("chokidar");

//引入 node 核心
const fs = require("fs");
const path = require("path");
const process = require("process");

//目前專案路徑
const PROJECT_PATH = process.cwd();

chokidar
  .watch(".", {
    //保持監聽
    persistent: true,
    //忽略監聽的文件或資料夾
    ignored: /(^|[\/\\])\..|test-config.js|node_modules/,
    //目前目錄與子目錄深度
    depth: 0,
  })
  .once("all", (change, pathname) => {
    let content = "";
    const newPath = path.join(PROJECT_PATH, "assets/img");
    const subFilenanmes = fs.readdirSync(newPath);
    subFilenanmes.forEach(function (file) {
      if (getFileType(file) === "png" || getFileType(file) === "jpg") {
        content += `{imgUrl: "assets/img/${file}"},`;
        fs.writeFileSync(path.join(`${PROJECT_PATH}/assets`, "img-data.js"), `export const allImg = [${content}]`);
      }
    });
    success();
  });

function getFileType(filename) {
  return filename.split(".").pop();
}

function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

const success = debounce(() => {
  console.log("已更新 img-data.js 檔案");
}, 500);
