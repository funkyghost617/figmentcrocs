// server.js
import express from "express";
import path from "path";
import fs from "node:fs/promises";
const app = express();
const port = process.env.PORT || 3000;
const __dirname = "./";

// serve static files from github pages project
app.use(express.static(path.join(__dirname, "public")));

// define a basic route for the root
app.get("/", (req, res) => {
    sendFileAsync("public/index.html", res);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.status(404).sendFile("public/404.html", { root: __dirname });
})

async function sendFileAsync(filePath, res) {
    try {
        const data = await fs.readFile(filePath);
        res.sendFile(filePath, { root: __dirname });
    } catch (error) {
        res.sendFile("public/pages/404.html", { root: __dirname });
    }
}
