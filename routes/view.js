const router = require("express").Router()
const path = require("path");

//gets for the basic html
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router