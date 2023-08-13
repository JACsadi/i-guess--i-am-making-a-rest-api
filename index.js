const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
app.use(express.json());
let alldata = [];
app.get("/", (req, res) => {
  res.status(200).json(JSON.stringify(alldata));
});
app.put("/appendData", (req, res) => {
  const newData = req.body;
  console.log(newData);
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
