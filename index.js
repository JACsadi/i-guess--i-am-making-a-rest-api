const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);

const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
app.use(express.json());
let alldata = [];
app.get("/", (req, res) => {
  res.status(200).json(alldata);
});
app.put("/appendData", (req, res) => {
  const newData = req.body;
  alldata.push(newData);
  res.status(200).json({ message: "Data added successfully", newData });
});
// app.post("/addData", (req, res) => {
//   const newData = req.body;
//   console.log("hi");
//   fs.readFile("songs.json", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).send("Internal Server Error");
//     }

//     const songs = JSON.parse(data);
//     songs.push(newData);
//     fs.writeFile("songs.json", JSON.stringify(songs), "utf-8", (writeErr) => {
//       if (writeErr) {
//         console.error("Error writing file:", writeErr);
//         return res.status(500).send("Internal Server Error");
//       }
//       res.status(201).json({ message: "Data added successfully", newData });
//     });
//   });
// });
app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
