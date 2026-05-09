import mongoose from 'mongoose';
import app from '../app';
import config from '../config';
import { seedSuperAdmin } from './seedAdmin';
import { errorLogger, logger } from '../shared/logger';

export async function main(server: any) {
  try {
    mongoose.connect(config.database_url as string);
    logger.info('🚀 Database connected successfully');

    // Seed Super Admin after database connection is successful
    await seedSuperAdmin();

    const port =
      typeof config.port === 'number' ? config.port : Number(config.port);

    server = app.listen(port, config.ip_address as string, () => {
      logger.info(`♻️  Application listening on port:${config.port}`);
    });
  } catch (error) {
    errorLogger.error('🤢 Failed to connect Database', error);
  }

  // Handle UnhandledRejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error('UnhandledRejection Detected', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
