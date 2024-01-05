
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "strapi-database.cneue8sw4uup.ap-northeast-1.rds.amazonaws.com"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "postgres123"),
    },
    useNullAsDefault: true,
    ssl: {
      rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
    },
  },
});