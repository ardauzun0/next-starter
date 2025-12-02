module.exports = {
      apps: [
          {
              name: 'GreenSoft Next.js',
              script: 'node_modules/next/dist/bin/next',
              args: 'start -p 3033',
              time: true,  // Add timestamp to logs
              autorestart: true,  // Restart app if it crashes
              instances: 'max',  // Run as many instances as there are CPU cores
              exec_mode: 'cluster',  // Enable clustering mode
              watch: false,  // Disable file watching
              max_memory_restart: '1G',  // Restart if memory exceeds 1GB
              env: {
                  NODE_ENV: 'production',
              },
          },
      ],
  };