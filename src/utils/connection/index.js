const { InputText } = require("../functions");
const path = require("path");
const pino = require("pino");

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");


async function Connection() {

    console.log("\x1b[1;33;42m Iniciando Conexão do M'Dev-Bot \x1b[m")

    const pathConnectionSave = path.resolve(__dirname, "..", "..", "..", "assets", "qrcode");
    const { state, saveCreds } = await useMultiFileAuthState(pathConnectionSave);

    const { version } = await fetchLatestBaileysVersion();

    const bot = makeWASocket({
        printQRInTerminal: false,
        version,
        logger: pino({ level: "error" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
    });

    if (!bot.authState.creds.registered) {
        const numeroWhatsApp = await InputText("Informe o seu número de WhatsApp \x1b[1;33m(Somente Número)\x1b[m: ");

        if (!numeroWhatsApp) {
            throw new Error("Número de WhatsApp inválido!");
        }

        const code = await bot.requestPairingCode(numeroWhatsApp);

        console.log(`Código de pareamento: ${code}`);
    }

    bot.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                Connection();
            }
        }
    });

    bot.ev.on("creds.update", saveCreds);

    const CFonts = require('cfonts');
    CFonts.say("M'DEV - BOT", {
        font: 'block',            
        align: 'center',            
        colors: ['green', 'yellow'],
        background: 'transparent',
        letterSpacing: 1,       
        lineHeight: 1,              
        space: true,                
        maxLength: '0',             
        gradient: true            
    });

    console.log("\x1b[1;32m O Bot Está Pronto!! \x1b[m")
    return bot;
};


module.exports = { Connection };