module.exports = function PingBanner(ping){ 
    return `
<html>
  <style>
  
    * {
      margin: 0;
      padding: 0;
      font-family: Arial,sans-serif;
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
      background-color: #202c33;
      padding: 12px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      
    }
    
    .imagem h1 {
      font-weight: 800;
      margin-bottom: 8px;
      margin-top: 5px;
    }
    hr {
      width: 82%;
    }
    .sub {
      background-color: #3D4E57;
      color: #FDC705;
      padding: 10px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 8px;
      margin-top: 18px;
      margin-bottom: 20px;
    }
    .ping {
      font-size: 60px;
      font-weight: 700;
    }
    
    .valor {
      color: #FDC705;
    }
  </style>
  <div class="container">
    <div class="imagem">
      <h1>© M'DEV-BOT</h1>
      <hr>
     
      <span class="sub">Meu ping de atividade 📶</span>
      <span class="ping">[ <span class="valor">${ping}</span> ]</span>
    </div>
  </div>
</html>
`;

}