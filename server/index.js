const express = require("express");
const jsonServer = require("json-server");

const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // กำหนดโดเมนหรือโฮสต์ของเซิร์ฟเวอร์ UI ของคุณที่ต้องการให้มีสิทธิ์เข้าถึง
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // กำหนดเมธอด HTTP ที่อนุญาต
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // กำหนดหัวข้อ HTTP ที่อนุญาตให้ส่งมาด้วยคำขอ
  if (req.method === "OPTIONS") {
    res.sendStatus(200); // ส่งสถานะ HTTP 200 กลับเมื่อคำขอเป็น OPTIONS
  } else {
    next(); // ผ่าน middleware ต่อไป
  }
});

const jsonServerRouter = jsonServer.router("db.json");
const jsonServerMiddlewares = jsonServer.defaults();

app.use("/api", jsonServerMiddlewares, jsonServerRouter);

setInterval(fetchDataFromNetpie, 5 * 60 * 1000);

function fetchDataFromNetpie() {
  let apiurl = "https://api.netpie.io/v2/device/shadow/data";
  let headers = {
    "content-type": "application/json",
    Authorization:
      "Device 36762317-6e8d-445f-94f1-4548c0a62191:p1xYZpb3kPr3i5quDNBQkUg1gscPDgNh",
  };

  axios
    .get(apiurl, { headers })
    .then((response) => {
      const { buzzer, temp, hum } = response.data.data;
      const logEntry = {
        ID: response.data.data.id,
        DATE: getCurrentDate(),
        Time: getCurrentTime(),
        Temp: temp,
        Hum: hum,
        Buzzer: buzzer,
      };
      saveDataToJSON(logEntry); // เซฟข้อมูลทันทีเมื่อได้รับข้อมูลจาก Netpie
    })
    .catch((error) => {
      console.log(error);
    });
}

// app.post("/update_status", (req, res) => {
//   const { status, bunzer, hum, temp } = req.body;
//   var buzzer = 0;
//   if (status == "BUZZER_ON") {
//     buzzer = 1;
//   } else {
//     buzzer = 0;
//   }
//   const logEntry2 = {
//     DATE: getCurrentDate(),
//     Time: getCurrentTime(),
//     Temp: temp,
//     Hum: hum,
//     Buzzer: buzzer,
//   };
//   saveDataToJSON2(logEntry2); // เซฟข้อมูลทันทีเมื่อได้รับคำสั่งจากอุปกรณ์ในเครือข่าย
// });

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function saveDataToJSON(logEntry) {
  console.log("BBBB");
  axios
    .post("http://localhost:3002/log_data", logEntry)
    .then(() => {
      console.log("Data saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
}

// function saveDataToJSON2(logEntry) {
//   // console.log("ฟฟฟ");
//   axios
//     .post("http://localhost:3002/log_data", logEntry)
//     .then(() => {
//       console.log("Data saved successfully.");
//     })
//     .catch((error) => {
//       console.error("Error saving data:", error);
//     });
// }

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
