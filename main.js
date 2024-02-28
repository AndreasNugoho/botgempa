const TelegramBot = require("node-telegram-bot-api")

const token = "7033442256:AAHL6SjDzUE2PNdShyT-h9qtqR5fm1XZ1u8"
const options = {
    polling:true
}

const gempabot = new TelegramBot(token, options)

// gempabot.on("message", (callback) => {
//     const id = callback.from.id
//     gempabot.sendMessage(id,callback.text)
// })

const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)


gempabot.onText(sayHi, (callback) => {
    gempabot.sendMessage(callback.from.id,"Hallo Juga!!")
})

gempabot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"

    const apiCall = await fetch(BMKG_ENDPOINT)
    const response = await apiCall.json()
    console.log(response)

    gempabot.sendMessage(callback.from.id, "Ini Berita Gempa")    
})

// console.log('bot ready! ')