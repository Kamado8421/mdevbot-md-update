
import os

pathIn = "C:\\Users\\lucia\\OneDrive\\Área de Trabalho\\bot\\assets\\cache\\ping.png"
pathOut = "C:\\Users\\lucia\\OneDrive\\Área de Trabalho\\bot\\assets\\cache\\node.webp"
creator = "SeuNome"


os.system(f"ffmpeg -i \"{pathIn}\" -vf scale=512:512 -metadata comment=\"Criado por {creator}\" \"{pathOut}\"")
