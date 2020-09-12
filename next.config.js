const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? 'https://2taku-quiz.vercel.app' : 'http://localhost:3000';

module.exports = {
    publicRuntimeConfig: {
        soundAssetFolder: `${basePath}/asset/sounds`,
        imageAssetFolder: `${basePath}/asset/images`
    }
}