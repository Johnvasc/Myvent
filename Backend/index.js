const app = require('./app');
const { ensureMasterAccount } = require('./src/services/authService');

const port = process.env.PORT || 3000;

async function start() {
  await ensureMasterAccount();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Falha ao inicializar o servidor:', error);
  process.exit(1);
});
