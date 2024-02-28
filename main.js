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
    const {
        Infogempa:
        {
            gempa: {
                Jam, Magnitude,Tanggal,Wilayah,Potensi,Kedalaman
            }
        }
    } = await apiCall.json()
    
    const resultText = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah} 
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
    `

    gempabot.sendMessage(callback.from.id, resultText)    
})

// console.log('bot ready! ')