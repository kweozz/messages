// add routes
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

// GET route voor het ophalen van berichten
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET messages",
        status: "success",
        data: {
            messages
        }
    });
});
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