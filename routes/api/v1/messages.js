let express = require("express");
const router = express.Router();

// Dummy data (je kan deze data eventueel uit een database halen)
let messages = [{
        id: 1,
        user: "john",
        message: "Hello World!"
    },
    {
        id: 2,
        user: "Jane",
        message: "Hi"
    }
];

// GET route voor het ophalen van alle berichten of berichten van een specifieke gebruiker
router.get("/", (req, res, next) => {
    const username = req.query.user; // Verkrijg de gebruikersnaam uit de queryparameter

    if (username) {
        // Filter berichten op basis van de gebruikersnaam
        const userMessages = messages.filter(msg => msg.user === username);

        if (userMessages.length > 0) {
            res.status(200).json({
                message: `Berichten van gebruiker ${username}`,
                status: "success",
                data: {
                    messages: userMessages
                }
            });
        } else {
            res.status(404).json({
                status: "error",
                message: `Geen berichten gevonden voor gebruiker ${username}`
            });
        }
    } else {
        // Als geen gebruikersnaam is opgegeven, geef alle berichten terug
        res.status(200).json({
            message: "GET berichten",
            status: "success",
            data: {
                messages
            }
        });
    }
});

// GET route voor het ophalen van een specifiek bericht op basis van ID
router.get("/:id", (req, res, next) => {
    const messageId = parseInt(req.params.id, 10);
    const message = messages.find(msg => msg.id === messageId);

    if (message) {
        res.status(200).json({
            status: "success",
            data: message
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Bericht niet gevonden"
        });
    }
});

// POST route voor het toevoegen van een bericht
router.post("/", (req, res, next) => {
    const {
        user,
        text
    } = req.body.message;
    const newMessage = {
        id: messages.length + 1,
        user: user,
        message: text
    };

    messages.push(newMessage);

    res.status(201).json({
        status: "success",
        message: "Bericht succesvol toegevoegd",
        data: {
            message: newMessage
        }
    });
});

// PUT route voor het bijwerken van een specifiek bericht
router.put("/:id", (req, res, next) => {
    const messageId = parseInt(req.params.id, 10);
    const {
        text
    } = req.body.message; // Verkrijg de nieuwe tekst uit de request body

    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        // Update de message tekst
        message.message = text;

        res.status(200).json({
            status: "success",
            message: "Bericht succesvol bijgewerkt",
            data: {
                message: message
            }
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Bericht niet gevonden"
        });
    }
});

// DELETE route voor het verwijderen van een specifiek bericht
router.delete("/:id", (req, res, next) => {
    const messageId = parseInt(req.params.id, 10);
    const messageIndex = messages.findIndex(msg => msg.id === messageId);

    if (messageIndex !== -1) {
        messages.splice(messageIndex, 1); // Verwijder het bericht uit de array

        res.status(200).json({
            status: "success",
            message: "Bericht succesvol verwijderd"
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Bericht niet gevonden"
        });
    }
});

module.exports = router;