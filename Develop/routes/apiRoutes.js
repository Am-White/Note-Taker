var fs = require('fs');

var data= fs.readFileSync("db/db.json");
var notesData = JSON.parse(data);

module.exports = function(app) {
    app.get("/api/notes", function(req,res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req,res) {
        var newNotes = req.body;
        newNotes.id = newNotes.title.replace(/\s+/g, "").toLowerCase();
        notesData.push(newNotes);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(newNotes);
    });

    app.delete("/api/notes/:id", function(req,res) {
        var chosen = req.params.id;
        notesData = notesData.filter(({ id }) => id != chosen);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(true);
    });
}