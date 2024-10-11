const fs = require('fs');
const path = require('path');

class SendMessage {
    constructor(bot, msgBot, from) {
        this.bot = bot;
        this.msgBot = msgBot;
        this.from = from;
    }

    async enviarTexto(texto) {
        await this.bot.sendPresenceUpdate('composing', this.from);
        await this.bot.sendMessage(this.from, { text: texto });


        await this.bot.sendPresenceUpdate('available', this.from);



    }

    async enviarImagem(filename, caption = '', isImageCache = false, viewOnce = false) {
        let folder = isImageCache ? 'cache' : 'images';
        await this.bot.sendMessage(this.from, {
            image: fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'assets', folder, filename)),
            caption: caption,
            footer: "Bot de WhatsApp",
            viewOnce: viewOnce,
            contextInfo: { quotedMessage: { conversation: '✅ MDEV-BOT IMAGENS' } }
        });
    }

    async enviarFigurinha(arquivo) {
        await this.bot.sendMessage(this.from, {
            sticker: fs.readFileSync(arquivo),
            contextInfo: { quotedMessage: { conversation: '✅ MDEV-BOT Sticker Generators' } }
        });
    }

    async enviarVideo(filename, caption = '', isImageCache = false, viewOnce = false) {
        let folder = isImageCache ? 'cache' : 'images';
        console.log('[ Enviando vídeo ]: '+filename)
        await this.bot.sendMessage(this.from, {
            video: fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'assets', folder, filename)),
            caption: caption,
            footer: "Bot de WhatsApp",
            viewOnce: viewOnce,
            contextInfo: { quotedMessage: { conversation: '✅ MDEV-BOT VIDEOS' } }
        });
    }
}

module.exports = { SendMessage };