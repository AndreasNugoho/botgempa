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
const cuaca = new RegExp(`^${prefix}cuaca$`)


gempabot.onText(sayHi, (callback) => {
    gempabot.sendMessage(callback.from.id,"Hallo Juga!!")
})

gempabot.onText(cuaca, async(callback) => {
    const BMKG_ENDPOINT_CUACA = "https://myip.api.akuari.my.id/myip"
    
    const apiCallCuaca = await fetch(BMKG_ENDPOINT_CUACA)

    const response = await apiCallCuaca.json()

    console.log(response)

    gempabot.sendMessage(callback.from.id,"Hallo Juga!!")
})

gempabot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT+"autogempa.json")
    const {
        Infogempa:
        {
            gempa: {
                Jam, Magnitude,Tanggal,Wilayah,Potensi,Kedalaman, Shakemap
            }
        }
    } = await apiCall.json()
    const BMKGImage = BMKG_ENDPOINT + Shakemap
    const resultText = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah} 
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
    `
    gempabot.sendPhoto(callback.from.id, BMKGImage, {
        caption:resultText
    })
    // gempabot.sendMessage(callback.from.id, resultText)    
})

// console.log('bot ready! ')