const { nomeBot } = require("../../../data/config");

exports.ErroPermissao = (permissao, comando) =>{
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *ERRO DE PERMISSÃO*

- ❧ ⚠️ Apenas usuários *${permissao}* podem utizar este comando
> *</> Comando:* ${comando} 

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
    
};