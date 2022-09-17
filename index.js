const express = require('express');
const app = express();
const PORT = 5000;
const axios = require('axios');
const cors = require('cors');
const schedule = require('node-schedule');
// const res = require('express/lib/response');
const Pool = require('pg').Pool;
// const pool = require('./db');

// middleware-full stack
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log(`Server listening at ${PORT}`);
});

const pool = new Pool ({
  user: "postgres",
  password: "Mamba0824",
  host: "localhost",
  port: 5432,
  database: "ipcs"
});

let serial_id = "device_COOKAS";
let date = new Date(2022, 3, 29, 8, 0) - 1;  // without cast to UTC+8 and turn ts back to yesterday.
const [t] = new Date(date).toISOString().split('T');
const url_period = `https://scplus.df.r.appspot.com/v1/getData/dateRange?serial_id=${serial_id}&startDate=${t}&endDate=${t}`;

let arr;
let obj;
schedule.scheduleJob('8 * * *', function() {  // schedule at 8 a.m. everyday. (test now)
  axios.get(url_period).then(response => {
    arr = JSON.parse(JSON.stringify(response.data));
    obj = arr.data; // array of json
    console.log(obj[0]);
    for (let i = 0; i < 1440; i++) {  //  
      console.log(obj[i]);
      if (obj[i] !== undefined){
        var tmp = new Date(obj[i].timestamp);
        var c = tmp.getTime();
        c += 28800000;
        var tmp2 = new Date(c);
        obj[i].timestamp = tmp2;
        pool.query(
          `INSERT INTO device_COOKAS (device_id, hum, kpa, rad, rain, serial_id, source, temp, _timestamp, _type, wd, ws) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, 
          [obj[i].device_id, obj[i].hum, obj[i].kpa, obj[i].rad, obj[i].rain, obj[i].serial_id, obj[i].source,
          obj[i].temp, obj[i].timestamp, obj[i].type, obj[i].wd, obj[i].ws]
        );
        console.log("insert");
      } else {
        break;
      }
    }
  });
});

// GET period data
app.get("/ipcs", async (req, res) => {
  // await
  try {
    const periodData = await pool.query(
      `SELECT * FROM device_cookas ORDER BY _timestamp DESC`
    );
    res.json(periodData.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// GET period data
app.get("/ipcs/:startDate/:endDate", async (req, res) => {
  try {
    res.json(req.params);
  } catch (error) {
    console.error(error.message);
  }
});

// GET specified timestamp data
// app.get("/ipcs/:latest", async (req, res) => {
//   try {
//     res.json(req.params);
//   } catch (error) {
//     console.error(error.message);
//   }
// });