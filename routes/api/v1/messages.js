// add routes
let express = require("express");
const router = express.Router();
//get /api/v1/messages

router.get("/", (req, res, next) => {
    res.status(200).json(
    {

        message: "GET messages",
        status: "succes",
        data: {
            "messages": [
                {
                id: 1,
                user:"john",
                message:"Hello World!"
            }
            ]
        }
    })
})
module.exports = router;
