// const db = require('./database');
const db = require

module.exports = {
    getCards: (req, res) => {
        const { id } = req.params;
        let user = db.find(usr => +id === +usr.id);
        res.status(200).send(user.cards);
    }
    // , getHandle: (req, res) => {

    // }
}