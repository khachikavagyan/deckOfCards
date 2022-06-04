export const ENVIRONMENT = process.env.APP_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 9000
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'

export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/katana'
export const TEST_DB_URI = process.env.TEST_DB_URI || 'mongodb://localhost:27018/test-katana'
