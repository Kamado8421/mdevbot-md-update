const { nomeBot, prefix } = require("../../../data/config");

function BemVindoBanner(nomeGrupo, pushName) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/index.css">
  <script src="js/index.js"></script>
  <title>html</title>
</head>
<body>
	 <style>
  
    * {
      margin: 0;
      padding: 0;
      font-family: Arial, Sans-Serif;
    }
    
    :root {
      --cor-primaria: #0AC04F;
    }
    
    .container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000;
    }
    
    .imagem {
      width: 400px;
      height: 200px;
      background-color: #0E151D;
      
      color: #fff;
      display: flex;
      
    }
    

    hr {
      width: 82%;
    }
    
    .columa1 {
      background-color: var(--cor-primaria);
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }
    
    .perfil {
      background-color: #0E151D;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-top: 20px;
      padding: 5px;
      border: 2px solid #fff;
    }
    
    .username {
      font-size: 7px;
      color: #fff;
      text-align: text-align;
      font-weight: bold;
      margin-top: 10px;
    }
    
    .tag, .cmds span .tag{
      color: var(--cor-primaria);
      font-weight: bold;
    }
    
    .text {
      color: #fff;
      font-size: 10px;
      text-align: center;
      width: 80%;
      margin: 15px auto;
    }
    
    .sub {
      font-size: 11px;
      text-align: center;
    }
    
    .columa2 h1 {
      font-size: 20px;
      text-align: center;
      padding: 10px;
      margin-top: 10px;
      font-weight: bolder;
    }
    
    .line {
      background-color: var(--cor-primaria);
      height: 1px;
      width: 80%;
      margin: auto;
    }
    
    .dark {
      color: #66686B;
      font-size: 9px;
      text-align: right;
      margin-right: 7px;
      margin-top: 25px;
    }
    
    .cmds {
      display: flex;
      padding: 3px;
      background-color: #17202C;
      border-radius: 3px;
      width: 60%;
      margin: 10px auto;
      justify-content: space-around;
      
    }
    
    .cmds span {
      font-size: 10px;
      color: #fff;
    }

  </style>
  <div class="container">
    <div class="imagem">
        <div class="columa1">
          <div style="font-size: 3px;display: flex; justify-content: center; align-items: center;" class="perfil">👨‍💻 privado</div>
          <p class="username">${pushName}</p>
        </div>
        <div class="columa2">
          <h1 class="tag">Seja Bem-vindo(a)!!</h1>
          <div class="line"></div>
          <p class="text">Olá, eu sou o <span class="tag">© ${nomeBot}</span>, seu assistente virtual do grupo, você acaba de entrar no grupo ${nomeGrupo}, fique de olho nas regras!!</p>
          <p class="tag sub">Para usar os meus serviço, envie:</p>
          <div class="cmds">
            <span><span class="tag">${prefix}</span>menu</span>
            <span><span class="tag">${prefix}</span>login</span>
          </div>
          <p class="footer dark">
            © ${nomeBot} by Luh'Dev
          </p>
        </div>
    </div>
  </div>
</body>
</html>`;
}