const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
app.use(express.json());
const new_data = {
  name: "Hello",
};
app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }

    const jsonData = await response.json();
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.put("/appendData", async (req, res) => {
  try {
    const existingDataResponse = await fetch(
      "https://example.com/external-data.json"
    );
    if (!existingDataResponse.ok) {
      throw new Error("Request failed");
    }

    const existingData = await existingDataResponse.json();

    const newData = req.body;
    existingData.push(newData);

    const updatedResponse = await fetch(
      "https://example.com/external-data.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingData),
      }
    );

    if (!updatedResponse.ok) {
      throw new Error("Update request failed");
    }

    res.status(200).json({ message: "Data appended successfully" });
  } catch (error) {
    console.error("Error appending data:", error);
    res.status(500).send("Internal Server Error");
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
  console.log(`API is running at http://localhost:${PORT}`);
});
