module.exports = (prefix='', pushName='', nomeBot='', nomeDono='') => {
    let p = prefix;
    let text = `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

                  Menu de Dono

> Admin: ${pushName}
> Algoritmo: ${nomeBot}
> Dono: ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   Acesse outros Menus

${menus(prefix)}
> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   Comandos de Dono

- ❧ ${p}banirusuario
- ❧ ${p}add-premium
- ❧ ${p}anti-pv + on (ou) off

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴    
    `;

    return text;
}