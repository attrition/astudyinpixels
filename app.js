var express = require("express");
var app = express();

var template = require("pug").compileFile(__dirname + "/source/templates/homepage.pug");
var path = require("path");

// check if 'dev' is passed in as an argument and use port 8080 in that case

// by default don't include a name, as it would be printed in the footer
var env = {
    port: 80,
    name: ""
};

if (process.argv.length >= 3) {
    if (process.argv[2] === "dev") {
        env.port = 8080;
        env.name = "dev";
    }
}

// static content

app.use(express.static(path.join(__dirname, "/static")));
app.use("/source/js", express.static(path.join(__dirname, "source/js")));
app.use("/source/font-awesome", express.static(path.join(__dirname, "source/font-awesome")));
app.use("/ld37/", express.static(path.join(__dirname, "projects/ld37")));
app.use("/roguespy/", express.static(path.join(__dirname, "projects/roguespy")));
app.use("/tdtest/", express.static(path.join(__dirname, "projects/tdtest")));
app.use("/tdtest/td_monsters", express.static(path.join(__dirname, "projects/tdtest/td_monsters")));

app.use("/ld38/", express.static(path.join(__dirname, "projects/SmallWorld")));
app.use("/ld38/Build", express.static(path.join(__dirname, "projects/SmallWorld/Build")));
app.use("/ld38/TemplateData", express.static(path.join(__dirname, "projects/SmallWorld/TemplateData")));

app.use("/min/", express.static(path.join(__dirname, "projects/min")));
app.use("/min/Build", express.static(path.join(__dirname, "projects/min/Build")));
app.use("/min/TemplateData", express.static(path.join(__dirname, "projects/min/TemplateData")));

// content serving

app.get("/", function(req, res) {
    res.send(template({ env: env.name }));
});

// exec

app.listen(env.port, function() {
    console.log("Listening on port " + env.port);
});

