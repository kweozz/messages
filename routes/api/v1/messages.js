// add routes
let express = require("express");
const router = express.Router();
//get /api/v1/messages

router.get("/", (req, res, next) => {
    res.json({
        message: "GET messages",
        status: "succes",
        data: {
            "messages": {}
        }
    })
})
module.exports = router;