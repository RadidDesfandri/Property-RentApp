module.exports = {
    apps: [
      {
        name: 'jcwd040802-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 4082,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd040802.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwd040802-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 4182,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd040802.purwadhikabootcamp.com/apps/api',
      },
    ],
};
