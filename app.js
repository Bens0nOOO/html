// 引入 library: express
const express = require("express");
// express 引入的是一個 function
const app = express();

//導入 JavaScript 中的 “ejs” 模組。
const ejs = require('ejs');

//導入 JavaScript 中的 “fs” 模組。
const fs = require('fs');

// 建立一個不易產生衝突的 port 用來測試
const port = 5001;

// 設定 view engine
app.set("view engine", 'ejs');

// 設定 view engine 的目錄
app.set('views', './views');

// 導入路由器
const userRouter = require("./routes/userRouter"); // 路徑根據實際情況調整

// 使用路由器
app.use('/Clothes', userRouter); // 將路由器掛載到'/user'路徑下

const data = require('./Data/Cloth.js');

// 從 'public' 目錄提供靜態文件
app.use(express.static('public'));

// 此程式碼片段將 Express 應用程式配置為使用 body-parser 中間件，特別是 urlencoded 解析器。
const bodyParser = require('body-parser');

// 此解析器用於解析帶有 URL 編碼負載的傳入請求。
app.use(bodyParser.urlencoded({ extended: true })); // Extended: true 選項允許以 URL 編碼格式對複雜物件和陣列進行編碼。

// 此程式碼片段在 Express.js 應用程式中設定一條路由
// 用於處理對「/submit-data」的 POST 請求。
app.post('/submit-data', (req, res) => {
  // 當向此路由發出 POST 請求時
  // 代碼從請求正文中提取“dataField”屬性的值
  const data_1 = req.body.dataField_user;
  const data_2 = req.body.dataField_pass;
  // 保存或處理數據
  // 將回應傳回客戶端
  // 其中包含訊息“已接收資料：”，後跟提取的資料。
  var outputFile = 'account : ' + data_1 + '\n password : ' + data_2;
  res.send('已接收數據：');
  fs.writeFile(`Data/account/${data_1}.txt`, outputFile, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
});

// 初始化頁面
// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get("/", (req, res) => {
  res.render("index");
});

const page = ["index", "aboutMe", "cloth1"];

// 在網址後面加上參數，可移動至指定的網頁
// 加上 :items 代表不確定的參數
app.get("/views/:items", (req, res) => {
  // params: 可拿到網址列上指定的參數
  const items = req.params.items; // parameter
  res.render(items); // render 指定的頁面
});


// var img_link = `/images/cloth/cloth${items}-1.png`;

// const image = ['/images/cloth/cloth1-1.png', '/images/cloth/cloth2-1.png', '/images/cloth/cloth3-1.png'];

const des = [`  『顏色』：白灰色/藏青色
                『尺寸』：S-2XL
                  S  衣長71 胸圍110
                  M 衣長73 胸圍114
                  L  衣長76 胸圍118
                  XL 衣長79 胸圍122
                  2XL 衣長82 胸圍126
                『價格』：680
                『關注蝦皮及ig以免錯過最新商品消息』
                『任何問題歡迎詢問』
                /聯絡資訊/
                  INSTARGRAM: goblet__official
                  SHOPEE:goblet__official`
          ]
app.get("/cloth1/:items", (req, res) => {
  // params: 可拿到網址列上指定的參數
  var items = req.params.items; // parameter
  res.render('clothes.ejs', { 
      img: `/images/cloth/cloth${items}-1.png`, 
      des : des[items-1]
      // Data.des[items-1]
      // des[items-1]
    }); // render 指定的頁面
})

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
