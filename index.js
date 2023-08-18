const express = require("express");
const fs = require("fs");
const app = express();
const alldata = [];
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://jacsadi.github.io");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const PORT = 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json(alldata);
});
app.post("/a", (req, res) => {
  const newData = req.body;
  const ele = alldata.find((e) => e.name === newData.name);
  if (ele) {
    alldata.map((a) => {
      if (a.name == newData.name) a.score = newData.score;
    });
  } else {
    alldata.push(newData);
  }
  res.status(200).json({ message: "Data added successfully" });
});
app.get("/element", (req, res) => {
  const name = req.query.name;
  const foundElement = alldata.find((element) => element.name === name);

  if (foundElement) {
    res.status(200).json(foundElement);
  } else {
    res.status(404).json({ message: "Element not found" });
  }
});
app.listen(PORT, () => {
  console.log(`API isz running at http://localhost:${PORT}`);
});
