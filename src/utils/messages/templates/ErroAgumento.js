const { nomeBot, prefix } = require("../../../data/config");

module.exports = function ErroArgumento (comando, arg, pushName=''){
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *ERRO AO EXECUTAR O COMANDO*

- ❧ ⚠️ ${pushName}, faltou o argumento do comando

> Use: *${prefix}${comando} + ${arg}*

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
    
};