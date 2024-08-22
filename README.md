<h1>Bienvenido a un ejemplo de una API CRUD</h1>

<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.mongodb.com/try/download/community-kubernetes-operator" target="_blank"><img src="https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png" width="200" alt="Mongo Logo" /></a>
  <a href="https://nodejs.org/en" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" width="200" alt="Node Logo" /></a>
</p>

<p align="center">npm v10.2.4</p>
<p align="center">node v20.9.0</p>


## INSTALACIÓN

Instalar Visual Studio Code:
<a href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a>

Instalar Git:
<a href="https://git-scm.com/download/" target="_blank">https://git-scm.com/download/</a>

Instalar nvm:
```bash
sudo su
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm –-
```

Instalar Node - Metodo 1 a su última versión:
<a href="https://nodejs.org/en" target="_blank">https://nodejs.org/en</a>
```bash
nvm install node
node --version
```

Instalar Node - Metodo 2 en una versión especifica:
<a href="https://nodejs.org/dist/v20.9.0/" target="_blank">https://nodejs.org/dist/v20.9.0/</a>
```bash
nvm install 20.9.0 // Node LTS
nvm ls
nvm use 20.9.0 | 20.9.0
nvm uninstall 20.9.0
```

Instalar mongodb:
<a href="https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.4-signed.msi" target="_blank">https://www.mongodb.com/try/download/community</a>
```bash
sudo apt install -y mongodb
sudo systemctl start mongod
sudo systemctl status mongod
```

Instalar Gestor de base de datos Compass:
<a href="https://downloads.mongodb.com/compass/mongodb-compass-1.41.0-win32-x64.exe" target="_blank">https://www.mongodb.com/try/download/compass</a>


## EJECUTAR APP

Instalar modulos
```bash
npm i
```

Compilar y crear la carpeta dist
```bash
npm run build
```

Ejecutar servidor por npm
```bash
npm run start
```

Ejecutar servidor por pm2
```bash
npm install -g pm2
pm2 start pm2.json
```

Configurar Git por primera vez
```bash
git config --global user.name "Nombre"
git config --global user.email nombre@example.com
git config --global credential.helper 'cache --timeout=10000'
```
