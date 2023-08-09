
const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;

        const data = await messageModel.create({
            message: { text: message },
            users: { from, to },
            sender: from,
        })
        if (data) return res.json({ msg: "message added successfully" });
        return res.json({ msg: "message added successfully" });
    } catch (e) {
        console.log(e)
    }
}

module.exports.getAllMessages = async (req, res) => {
    try {
        const { from, to } = req.body;


        const messages = await messageModel.find({});
        // .sort({ updatedAt: 1 })
       
        
        const projectedMessages = messages.filter(msg=> ([from,to].includes( msg.users[0].to)) && ([from,to].includes(msg.users[0].from)))
        .map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
        
    } catch (ex) {
        console.log(ex);
    }
};