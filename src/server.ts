import { main } from './DB/serverConnection';
import { errorLogger, logger } from './shared/logger';

//uncaught exception
process.on('uncaughtException', error => {
  errorLogger.error('UnhandledException Detected', error);
  process.exit(1);
});
console.log(process.env.SUPER_ADMIN_EMAIL);
let server: any;

main(server);

//SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM IS RECEIVE');
  if (server) {
    server.close();
  }
});
