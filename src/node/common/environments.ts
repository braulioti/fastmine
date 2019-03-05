export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_DATABASE || 'redtrench',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    },
    redmineDB: {
        host: process.env.REDMINE_DB_HOST || '',
        port: parseInt(process.env.REDMINE_DB_PORT) || 3306,
        database: process.env.REDMINE_DB_DATABASE || '',
        user: process.env.REDMINE_DB_USER || 'root',
        password: process.env.REDMINE_DB_PASSWORD || ''
    },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        permissionDefault: process.env.PERMISSION_DEFAULT || 'user',
        apiSecret: process.env.API_SECRET || 'HJKSDFHKHSDFFOIFEOI',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERTI_FILE || '/app/keys/fullchain.pem',
        key: process.env.CERT_KEY_FILE || '/app/keys/privkey.pem'
    }
};