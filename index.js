const express = require("express");
const fs = require("fs");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://jacsadi.github.io"); // Replace with your actual web app's domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const PORT = 8000;
app.use(express.json());

let alldata = [{ alu: 123 }];

app.get("/", (req, res) => {
  res.status(200).json(alldata); // Send the array directly as JSON
});
app.post("/a", (req, res) => {
  const newData = req.body; // req.body is already an object, no need to parse
  console.log(newData);
  alldata.push(newData);
  res.status(200).json({ message: "Data added successfully" });
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
  console.log(`API isz running at http://localhost:${PORT}`);
});
