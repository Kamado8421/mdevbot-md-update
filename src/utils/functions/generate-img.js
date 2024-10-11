const puppeteer = require('puppeteer');
const fs = require('fs');
const { CACHE_FOLDER } = require('../../data/config');
const { gerarValorAleatorio } = require('.');
const path = require('path');

async function gerarImagem(html) {
  // Abre o navegador
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Define o conteúdo HTML
  await page.setContent(html);
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });


  // Seleciona a div pela classe 'imagem'
  const div = await page.$('.imagem');
  
  let token = gerarValorAleatorio(1, 2);
  const nameImg = `ping-${token}.png`;

  const pathFile = path.join(CACHE_FOLDER, nameImg);
  
  // Tira o screenshot da div selecionada
  await div.screenshot({ path: pathFile, omitBackground: true });

  console.log('Imagem gerada com sucesso!');

  await browser.close();

  return nameImg;
}

module.exports = gerarImagem;

