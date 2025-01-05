require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// App und Middleware einrichten
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));


// Mit MongoDB Atlas verbinden
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("MongoDB Verbindungsfehler:", err));


// Schema und Modell erstellen
const ideeSchema = new mongoose.Schema({
    titel: { type: String, required: true },
    beschreibung: { type: String, required: true },
});
const Idee = mongoose.model("Idee", ideeSchema);

const entwurfSchema = new mongoose.Schema({
    titel: {type: String, required: true},
    beschreibung: {type: String, required: true},
    stack: {type: [String], default: []},
    feature1: {type: String},
    feature2: {type: String},
    feature3: {type: String},
    feature4: {type: String},
    feature5: {type: String},
    feature6: {type: String},
    projectfiles: {type: [String]},
    projectMockup: {type: [String]},
    startdatum: {type: String},
    notizen: {type: String},
});
const Entwurf = mongoose.model("Entwurf", entwurfSchema, "Projekt-Entwürfe");


// Routen Entwürfe
app.get("/entwuerfe", async (req, res) => {
    try{
        const entwürfe = await Entwurf.find();
        res.json(entwürfe);
    } catch{
        res.status(500).json({ message: "Fehler beim Abrufen der Ideen route" })
    }
});
app.post("/entwuerfe", async (req, res) => {
    const { titel, beschreibung, stack, feature1, feature2, feature3, 
            feature4, feature5, feature6, projectfiles, projectMockup, 
            startdatum, notizen } = req.body;
    try {
        const neuerEntwurf = new Entwurf({
            titel, beschreibung, stack, feature1, feature2, feature3,
            feature4, feature5, feature6, projectfiles, projectMockup,
            startdatum, notizen
        });
        await neuerEntwurf.save();
        res.status(201).json(neuerEntwurf);
    } catch(err) {
        res.status(400).json({ message: "Fehler beim Speichern des Entwurfs"});
    }
});
app.delete("/entwuerfe/:id", async (req, res) => {
    const {id} = req.params;
    try{
        await Entwurf.findByIdAndDelete(id);
        res.status(204).send();
    } catch(err){
        res.status(500).json({ message: "Fehler beim Löschen der Idee"});
    }
});


// Routen Ideen
app.get("/ideen", async (req, res) => {
    try {
        const ideen = await Idee.find();
        res.json(ideen);
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Abrufen der Ideen route" });
    }
});
app.post("/ideen", async (req, res) => {
    const { titel, beschreibung } = req.body;
    try {
        const neueIdee = new Idee({ titel, beschreibung });
        await neueIdee.save();
        res.status(201).json(neueIdee);
    } catch (err) {
        res.status(400).json({ message: "Fehler beim Speichern der Idee" });
    }
});
app.delete("/ideen/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Idee.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Löschen der Idee" });
    }
});


// Server starten
const PORT = 5001;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));