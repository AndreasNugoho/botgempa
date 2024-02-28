const TelegramBot = require("node-telegram-bot-api")

const token = "7033442256:AAHL6SjDzUE2PNdShyT-h9qtqR5fm1XZ1u8"
const options = {
    polling:true
}

const gempabot = new TelegramBot(token, options)

gempabot.on("message", (callback) => {
    const id = callback.from.id
    gempabot.sendMessage(id,"Iya")
})

// console.log('bot ready! ')