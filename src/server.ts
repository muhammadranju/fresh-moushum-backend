import { main } from './DB/serverConnection';

// Uncaught exception handler
process.on('uncaughtException', error => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

let server: any;
main(server);

// SIGTERM handler
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  if (server) {
    server.close();
  }
});
