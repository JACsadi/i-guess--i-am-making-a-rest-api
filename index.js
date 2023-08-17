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

let alldata = [];

app.get("/", (req, res) => {
  res.status(200).json(alldata); // Send the array directly as JSON
});
app.post("/a", (req, res) => {
  const newData = req.body; // req.body is already an object, no need to parse
  const ele = alldata.find(e => e.name === newData.name);
  if(ele) {
   alldata.map(a => {
     if(a.name = newData.name) a.score = newDara.score;
   }
  } else {
  alldata.push(newData);
  }
    res.status(200).json({ message: "Data added successfully" });
});
app.get("/element", (req, res) => {
  const name = req.query.name; // Extract the 'name' query parameter

  // Find the element in your data based on the name
  const foundElement = alldata.find(element => element.name === name);

  if (foundElement) {
    res.status(200).json(foundElement);
  } else {
    res.status(404).json({ message: "Element not found" });
  }
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
