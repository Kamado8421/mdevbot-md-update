const { Connection } = require('./utils/connection');
const path = require('path');

// funcões personalizadas
const { GetSimpleResultAPI, gerarValorAleatorio, getJidDono, gerarJid, showMessageConsole } = require('./utils/functions');
const { verificarUsuarioPremium, verificarIsDono, verificarServidorAtivo, verificarLinkYoutube } = require('./utils/functions/verificadores');
const gerarImagem = require('./utils/functions/generate-img');

const { prefix, nomeBot, nomeDono, numeroDono, API_KEYs, CACHE_FOLDER } = require('./data/config');

const { SendMessage } = require('./utils/messages');

// templates de mensagens de menus
const MenuPrincipal = require('./utils/messages/menus/Menu');

// templates de mensagens
const ComandoInvalidoMsg = require('./utils/messages/templates/ComandoInvalido-msg');
const ErroAgumento = require('./utils/messages/templates/ErroAgumento');
const PingMsg = require('./utils/messages/templates/Ping-msg');

// executores de comandos
const execComandoClima = require('./utils/commands/Clima');
const execComandoPlayVideo = require('./utils/commands/PlayVideo');
const execComandoTraduzir = require('./utils/commands/Traduzir');

// templates de banner html
const PingBanner = require('./utils/messages/html/PingBanner');
const BemVindoBanner = require('./utils/messages/html/BemVindoBanner');
const Group = require('./utils/models/Group');
const execComandoSticker = require('./utils/commands/Sticker');
const fs = require('fs');
const { ErroGenerico } = require('./utils/messages/templates/ErroGenerico');
const { ErroPermissao } = require('./utils/messages/templates/ErroPermissao');

const PHONE_WORNER = '559883528062';
async function startBot() {
    const bot = await Connection();

    const STATUS_API = { isServeActived: true, isWonerNoticated: false };
    STATUS_API.isServeActived = await verificarServidorAtivo();

    bot.ev.on("messages.upsert", async ({ messages }) => {
        try {
            const msgBot = await messages[0];
            const keyMessage = msgBot?.key;

            if (!STATUS_API.isServeActived && !STATUS_API.isWonerNoticated) {
                bot.sendMessage(getJidDono(), { text: '⚠️ O Servirdor *PYTHON* não foi iniciado!!\n*Inicie-o:*> `python3 ./src/python/app.py`' });
                STATUS_API.isWonerNoticated = true;
            } else if (STATUS_API.isServeActived && STATUS_API.isWonerNoticated) { STATUS_API.isWonerNoticated = false; }

            const isMsgBot = msgBot?.key?.fromMe;
           
            if (isMsgBot) return; // não faz nada

            const messageType = Object.keys(msgBot?.message)[0];

            console.log(msgBot);

            const from = msgBot?.key?.remoteJid;
            const participant = msgBot?.key?.participant;
            const pushName = msgBot?.pushName;
            const message = msgBot?.message?.conversation || msgBot?.message?.imageMessage?.caption || msgBot?.message?.extendedTextMessage.text || msgBot?.message?.videoMessage?.caption || '';

            const isGroup = participant ? true : false;
            const isDono = verificarIsDono(isGroup ? participant : from);
            const GRUPO = isGroup ? new Group(from) : null;  

            // verificadores de comandos
            const isCommand = message.startsWith(prefix);
            const command = isCommand ? message.slice(prefix.length).split(' ')[0].trim().toLowerCase() : null;
            const args = isCommand ? message.slice(prefix.length + command.length).trim() : message;

            // verificadores de tipagens
            const isImage = messageType === 'imageMessage';
            const isVideo = messageType === 'videoMessage';
            const isSticker = messageType === 'stickerMessage';

            const isPremiumUser = verificarUsuarioPremium(isGroup ? participant : from);

            showMessageConsole(command, args, pushName, isGroup, isPremiumUser);
            var resultado;
            if (isCommand) {

                const MDEVBOT = new SendMessage(bot, msgBot, from);

                switch (command) {
                    case 's': case 'sticker': case 'figu': case 'f':
                        if(!isImage) return MDEVBOT.enviarTexto('Você precisa enviar uma imagem')
                        await execComandoSticker(msgBot, MDEVBOT, messageType, bot);
                        console.log('Figurinha gerada');
                        break;
                    case 'ping':
                        const PING_BOT = gerarValorAleatorio(100, 999);
                        let nameImg = await gerarImagem(PingBanner(`0.${PING_BOT}`));
                        MDEVBOT.enviarImagem(nameImg, PingMsg(pushName, prefix, nomeBot), true);
                        break;

                    case 'menu':
                        MDEVBOT.enviarImagem('menu-principal.png', MenuPrincipal(prefix, pushName, nomeBot, nomeDono));
                        break;

                    case 'clima':
                        if (!args) return MDEVBOT.enviarTexto('Você precisa informar o nome da cidade junto do comando.');
                        resultado = await execComandoClima(args, API_KEYs);

                        MDEVBOT.enviarImagem('previsao-tempo.png', resultado);
                        break;

                    case 'play-video':
                        if(!isPremiumUser || !isDono) return MDEVBOT.enviarTexto(ErroPermissao('PREMIUMS', command));
                        if (!args) return MDEVBOT.enviarTexto(ErroAgumento(command, 'link do YouTube', pushName));
                        let linkVideo = args.trim();
                        MDEVBOT.enviarTexto('> Verificando seu link do *YouTube.* ⌛');
                        if(!verificarLinkYoutube(linkVideo)) return MDEVBOT.enviarTexto(ErroGenerico('O Argumento/link que você enviou com o comando não pertence ao *YouTube.*'))

                        
                        await execComandoPlayVideo(from, MDEVBOT, linkVideo);
                        break;

                    case 'traduzir':
                        if (!args) return MDEVBOT.enviarTexto(ErroAgumento(command, 'frase em inglês', pushName));
                        resultado = execComandoTraduzir(args);
                        MDEVBOT.enviarTexto(resultado);
                        break;

                    case 'bugs': case 'bug':
                        if(!args) return MDEVBOT.enviarTexto(ErroAgumento(command, 'bug encontrado', pushName));

                        await bot.sendMessage(gerarJid(PHONE_WORNER), {text: `👨‍💻❗ *BUG REPORTADO*\n\n> *Usuário:* ${pushName}\n> *Telefone:* https://wa.me/${isGroup ? participant.replace('@s.whatsapp.net', '') : from.replace('@s.whatsapp.net')}\n\n*Bug:*\n- ${args}`});

                        await MDEVBOT.enviarTexto('Reportado com sucesso!!\n\n- ⚠️ (OBS): Dependendo da sua mensagem, você pode ser banido do uso do Bot');
                        break;
                    case 'sugestao':
                        if(!args) return MDEVBOT.enviarTexto(ErroAgumento(command, 'sua opnião', pushName));

                        await bot.sendMessage(gerarJid(PHONE_WORNER), {text: `👨‍💻✅ *SUGESTÃO PARA O BOT*\n\n> *Usuário:* ${pushName}\n> *Telefone:* https://wa.me/${isGroup ? participant.replace('@s.whatsapp.net', '') : from.replace('@s.whatsapp.net')}\n\n*Sugestão:*\n- ${args}`});

                        await MDEVBOT.enviarTexto('Sugerido com sucesso!!\n\n- ⚠️ (OBS): Dependendo da sua mensagem, você pode ser banido do uso do Bot');
                        break;
                    case 'fazer-parte':
                        break;
                        
                    default:
                        MDEVBOT.enviarTexto(ComandoInvalidoMsg(command, pushName, prefix, nomeBot));
                        break;
                }

                await bot.readMessages([keyMessage]);

            }


        } catch (error) {
            console.error(error);
        }
    });

}

startBot();