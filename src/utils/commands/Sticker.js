const { writeFile } = require('fs/promises');
const { gerarValorAleatorio, deletarArquivo, baixarImagem } = require('../functions/index');
const { exec } = require('child_process');
const path = require('path');
const { CACHE_FOLDER } = require('../../data/config');
const fs = require('fs');
const { SendMessage } = require('../messages');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');


async function execComandoSticker(msgBot, MDEVBOT = new SendMessage, messageType, bot) {
  if (messageType === 'imageMessage') {
    const buffer = await downloadMediaMessage(msgBot, 'buffer', {}, {
      logger: bot.updateMediaMessage
    });

    const entrada = path.resolve(CACHE_FOLDER, `in-${gerarValorAleatorio(100, 999)}.jpeg`);
    const saida = path.resolve(CACHE_FOLDER, `sticker-out-${gerarValorAleatorio(100, 999)}.webp`);

    await writeFile(entrada, buffer);

    await MDEVBOT.enviarTexto('Recebi sua imagem!! Aguarde só um momento...')

    await exec(
      `ffmpeg -i "${entrada}" -vf scale=512:512 -metadata comment="Criado Por BOT" "${saida}"`,
      async (error) => {
        if (error) {
          console.log(error);
          fs.unlinkSync(entrada);

          await MDEVBOT.enviarTexto('❌ Opss!! :(\n> Obtive um erro ao gerar a figurinha!!')
          throw new Error(error);
        }

        console.log('figurinha agerada')

        await MDEVBOT.enviarFigurinha(saida);

        fs.unlinkSync(entrada);
        fs.unlinkSync(saida);

      }
    );

  }


}

module.exports = execComandoSticker;


