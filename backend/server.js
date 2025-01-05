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