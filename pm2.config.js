module.exports = {
  apps : [{
    name: 'app-sgutic',
    script: 'dist/main.js',
    watch: true, // Habilita la observación de cambios
    ignore_watch: ["node_modules", "logs"], // Ignora estos directorios para evitar reinicios innecesarios
    watch_options: {
      followSymlinks: false
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
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
