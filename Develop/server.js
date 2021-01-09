var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3030;

//Setting up express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//GET requests to HTML files
app.get('/', (req, res) => {
    //Home page
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Notes page
app.get('/notes', (req, res) => {
    //Connecting to html with note
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('./db/db.json');
    Notes = data;
    const notes = JSON.parse(data);
        res.json(notes)
});

//POST
app.post('/api/notes', (req,res) => {
    //Request
    var newNote = req.body;

    fs.readFile('./db/db.json', function (err,data) {
        //Converted to json
        var json = JSON.parse(data)
        const id = json [json.length - 1].id;
        newNote.id = id + 1;
        json.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(json))
    })
    //Respond
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', function (err, data) {

        const json = JSON.parse(data);
        console.log('json before: ' + json);

        json.forEach(element => {

            if (json.id === req.id){
                const index = json.indexOf(element);
                
                if (index > -1) {
                    json.splice(index, 1);
                }
            }
            console.log('json after: ' + json);
        });
        fs.writeFileSync('.db/db.json', JSON.stringify(json));
        res.json(json);
    })
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
