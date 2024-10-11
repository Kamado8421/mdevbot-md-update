const { default: axios } = require("axios");
const readline = require("readline");
const { numeroDono, SERVER_HOST, CACHE_FOLDER } = require("../../data/config");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const path = require("path");
const { writeFile } = require("fs/promises");
const fs = require("fs");

function InputText(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(message, resolve));
};

async function GetSimpleResultAPI(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        return await data;

    } catch (error) {
        console.error(error);
        return false;
    }
}

async function PostSimpleResultAPI(URL, data = {}) {
    axios.post(URL, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Erro ao fazer o download:', error.response.data);
            return error.response.data
        });
}

function gerarValorAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}


function gerarJid(numero) {
    return `${numero}@s.whatsapp.net`;
}

function getJidDono() {
    return gerarJid(numeroDono);
}


function deletarArquivo(PATH_FILE) {
    try {
        fs.unlinkSync(PATH_FILE);
    } catch (error) {
        console.error('\n\nOcorreu um erro ao utilizar a função deletarArquivo()\n' + error);
    }
}


async function baixarArquivo(msgBot, nomeArquivo, context, extension) {
    const content = getTypeMessage(msgBot, context);

    if (!content) {
        return null;
    }

    const stream = await downloadContentFromMessage(content, context);

    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.resolve(CACHE_FOLDER, `${ nomeArquivo }.${ extension }`);

    await writeFile(filePath, buffer);

    return filePath;
};

async function baixarImagem(msgBot, nomeArquivo){
    return await baixarArquivo(msgBot, nomeArquivo, 'image', 'png');
}

function showMessageConsole(comando, args, pushName, isGroup, isPremiumUser){
    console.log('\n------------------------------------');
    console.log("\x1b[1;32;43m M'Dev Bot - Messages:              \x1b[m");
    console.log('------------------------------------');
    console.log("   \x1b[1;32mUsuário: \x1b[1;33m"+ pushName + "\x1b[m");
    console.log("   \x1b[1;32mComando: \x1b[1;33m"+ comando + "\x1b[m");
    console.log("   \x1b[1;32mMensagem: \x1b[1;33m"+ args + "\x1b[m");
    console.log("   \x1b[1;32mÉ Premium?: \x1b[1;33m"+ isPremiumUser + "\x1b[m");
    console.log("   \x1b[1;32mÉ Grupo?: \x1b[1;33m"+ isGroup + "\x1b[m");
    console.log('------------------------------------\n');
}


module.exports = {
    InputText,
    GetSimpleResultAPI,
    PostSimpleResultAPI,
    gerarValorAleatorio,
    getJidDono,
    gerarJid,
    deletarArquivo,
    baixarImagem,
    showMessageConsole,
    showMessageConsole,
};

