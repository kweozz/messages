// add routes
let express = require("express");
const router = express.Router();

// Dummy data (je kan deze data eventueel uit een database halen)
const messages = [
    {
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

// GET /api/v1/messages
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "GET messages",
        status: "success",
        data: { messages }
    });
});

// GET /api/v1/messages/:id
router.get("/:id", (req, res, next) => {
    const messageId = parseInt(req.params.id, 10); // Verkrijg de ID uit de URL
    const message = messages.find(msg => msg.id === messageId); // Zoek het bericht op ID

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

module.exports = router;
