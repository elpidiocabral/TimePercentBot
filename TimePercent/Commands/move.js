const { messageLink } = require("discord.js")

function turnoPercent(velocidade, distancia) {
    let disTotal = Math.floor( (velocidade/10) ) * 50 
    let tt = (distancia*100 ) / disTotal 

    return Math.floor(tt)
}

function distanciaPercorrida(velocidade, porcentagem) {
    let disTotal = Math.floor( (velocidade/10) ) * 50
    let tt = (disTotal*porcentagem) / 100

    return Math.floor(tt)
}

module.exports.run = (client, msg, args) => {
    const info = msg.content.toLowerCase().replace(/\s/g, '')
    let velocidade = info.substring(info.indexOf("e") + 1, info.indexOf(","))
    let percorre = info.substring(info.indexOf(",") + 1)
    let percent

    if (info.charAt(info.length - 1) === '%') {
        percent = distanciaPercorrida(velocidade, percorre.substring(0, (percorre.length - 1)))
        msg.reply(`<@${msg.author.id}> percorreu **${percent}m** de distância em *${percorre}* de *TT*`)
    } else {
        percent = turnoPercent(velocidade, percorre)
        msg.reply(`<@${msg.author.id}> usou **${percent}%** de **TT** para movimentar-se *${percorre}m*!`)
    }
}