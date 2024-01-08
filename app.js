const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/activate-search", (req, res) => {
    let [dateOne, dateTwo] = [req.body.dateOne, req.body.dateTwo];
    if (!dateOne || !dateTwo) {
        return res.status(400).send("Please enter two valid dates");
    } else {
        //check if the start and end dates are valid or not:
        dateOne = new Date(dateOne);
        dateTwo = new Date(dateTwo);
        if (dateOne > dateTwo) {
            return res.status(400).send("Please enter two valid dates");
        }
        //make a GET request to github api here.
    }
});

app.listen(3000);
