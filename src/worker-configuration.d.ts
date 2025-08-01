interface Env {
  DB: D1Database;
  QLOO_API_KEY: string;
  MOCHA_USERS_SERVICE_API_KEY: string;
  MOCHA_USERS_SERVICE_API_URL: string;
}

declare global {
  interface Env {
    DB: D1Database;
    QLOO_API_KEY: string;
    MOCHA_USERS_SERVICE_API_KEY: string;
    MOCHA_USERS_SERVICE_API_URL: string;
  }
}
