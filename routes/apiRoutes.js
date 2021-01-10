var fs = require('fs');

//Read and parse notes data
var data= fs.readFileSync("db/db.json");
var notesData = JSON.parse(data);

module.exports = function(app) {
    //Read the db.json file and return
    app.get("/api/notes", function(req,res) {
        res.json(notesData);
    });

    //Receive notes to save
    app.post("/api/notes", function(req,res) {

        var newNotes = req.body;
        //Meta-character
        newNotes.id = newNotes.title.replace(/\s+/g, "").toLowerCase();

        notesData.push(newNotes);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(newNotes);
    });

    //Deleted notes with given ID
    app.delete("/api/notes/:id", function(req,res) {

        var chosen = req.params.id;
        notesData = notesData.filter(({ id }) => id != chosen);

        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(true);
    });
}