import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(5001),
    MONGODB_URL: joi.string().required().description('Mongo DB URL'),
    JWT_SECRET: joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: joi.number().default(30).description('days after which refresh tokens expire'),
    UPLOAD_PATH: joi.string().required().description('Upload Path'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  uploadPath: envVars.UPLOAD_PATH,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
};
