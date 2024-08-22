module.exports = {
  apps : [{
    name: 'app-sgutic',
    script: 'dist/main.js', // Ruta al archivo principal de tu aplicación compilada
    instances: 1,           // Número de instancias a ejecutar
    autorestart: true,      // Reiniciar automáticamente si falla
    watch: false,           // No supervisar los archivos para reiniciar automáticamente
    max_memory_restart: '1G', // Reiniciar si el uso de memoria excede 1GB
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/sgutic'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/sgutic'
    }
  }]
};

