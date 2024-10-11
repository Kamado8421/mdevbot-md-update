module.exports = function ComandoInvalidoMsg (comando, pushName='', prefix='', nomeBot=''){
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *COMANDO INEXISTENTE*

- ❧ Usuário: ${pushName}
- ❧ Comando: ${prefix}${comando}

> Acesse o Menu: *${prefix}menu*

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
    
};