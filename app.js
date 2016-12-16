var express = require("express");
var app = express();

var template = require('pug').compileFile(__dirname + '/source/templates/homepage.pug');
var path = require('path');

// check if 'dev' is passed in as an argument and use port 8080 in that case 

// by default don't include a name, as it would be printed in the footer
var env = {
    port: 80,
    name: ""
};

var port = 80;
if (process.argv.length >= 3) {
    if (process.argv[2] === "dev") {
        env = { port: 8080, name: "dev" };
    }
}

// static content

app.use(express.static(__dirname + '/static'));
app.use('/ld37/', express.static(path.join(__dirname, 'projects/ld37')));

// content serving

app.get("/", function(req, res) {
    res.send(template({ env: env.name }));
});

app.get("/projects/ld37/", function(req, res) {
   res.sendFile(path.join(__dirname, "ld37/index.html"));
});

// exec

app.listen(env.port, function() { 
    console.log("Listening on port " + env.port);
});

