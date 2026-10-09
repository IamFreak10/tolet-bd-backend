module.exports = {
  apps: [
    {
      name: "tolet_bd_backend",
      script: "./server.js",
      instances: "max", // Automatically scales to use all CPU cores
      exec_mode: "cluster", // Enables Cluster mode for load balancing
      env: {
        NODE_ENV: "production",
      }
    }
  ]
}
