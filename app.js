const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { Octokit, App } = require("octokit");
const { fstat } = require("fs");
require("dotenv").config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/activate-search", async (req, res) => {
    let [dateOne, dateTwo] = [req.body.dateOne, req.body.dateTwo];
    if (!dateOne || !dateTwo) {
        return res.status(400).send("Please enter two valid dates");
    } else {
        //check if the start and end dates are valid or not:
        if (new Date(dateOne) > new Date(dateTwo)) {
            return res.status(400).send("Please enter two valid dates");
        }
        //make a GET request to github api here.
        const result = await octokit.request(`GET /search/repositories`, {
            q: `created:${dateOne}..${dateTwo}`,
            sort: "stars",
            order: "desc",
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });

        console.log(result.data.items.slice(0, 10));
        const finalData = JSON.stringify(
            result.data.items.slice(0, 10).map((item) => item["html_url"])
        );
        console.log("🚀 ~ file: app.js:41 ~ app.post ~ finalData :", finalData);

        fs.writeFileSync("data.json", finalData, {
            encoding: "utf-8",
            flag: "w",
        });
        res.send("oof");
    }
});

app.listen(3000);
