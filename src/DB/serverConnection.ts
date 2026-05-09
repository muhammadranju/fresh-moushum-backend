/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import colors from 'colors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import app from '../app';
import config from '../config';
import { seedSuperAdmin } from './seedAdmin';
import { socketHelper } from '../helpers/socketHelper';
import { errorLogger, logger } from '../shared/logger';
export async function main(server: any) {
  try {
    mongoose.connect(config.database_url as string);
    logger.info(colors.green('🚀 Database connected successfully'));

    //Seed Super Admin after database connection is successful
    await seedSuperAdmin();

    const port =
      typeof config.port === 'number' ? config.port : Number(config.port);

    server = app.listen(port, config.ip_address as string, () => {
      logger.info(
        colors.yellow(`♻️  Application listening on port:${config.port}`),
      );
    });

    //socket
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: '*',
      },
    });
    socketHelper.socket(io);
    //@ts-ignore
    global.io = io;
  } catch (error) {
    console.log(error);
    errorLogger.error(colors.red('🤢 Failed to connect Database'));
  }

  //handle UnhandledRejection
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
