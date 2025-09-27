export const config = {
    jwtSecret: process.env.JWT_SECRET as string || 'My_secret_Key',
    port: process.env.PORT || 4000,
}