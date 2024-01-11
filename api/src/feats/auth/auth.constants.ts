import { ConfigService } from '@nestjs/config';

const config: ConfigService = new ConfigService();

/**
 * This constant is used to describe the JWT Constants
 * @type {object}
 */
export const JwtConstants = {
  secret: config.get('JWT_SECRET'),
  expiration_time: config.get('JWT_EXPIRATION_TIME'),
};
