export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_DATABASE || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || ''
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