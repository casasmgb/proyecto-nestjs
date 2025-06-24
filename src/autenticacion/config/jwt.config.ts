export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'Clav3&&S3cret@',
    signOptions: {
        expiresIn: process.env.JWT_EXPIRE || '2h'
    },
    verifyOptions: {
        ignoreExpiration: false
    }
}