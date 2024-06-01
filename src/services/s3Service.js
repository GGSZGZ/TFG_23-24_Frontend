const bucketName = 'tfgisggs';
const baseUrl = `https://${bucketName}.s3.amazonaws.com`;

export default {
  async getImageUrl(studio, game, imgNumber) {
    try {
      const imageUrl = `${baseUrl}/${studio}/${game}/img${imgNumber}.jpg`;
      return imageUrl;
    } catch (error) {
      console.error('Error al construir la URL de la imagen:', error);
      throw error;
    }
  },
  async getFirstImageUrl(studio, game) {
    return this.getImageUrl(studio, game, 1);
  },
  async getStudioImageUrl(studio) {
    try {
      const imageUrl = `${baseUrl}/${studio}/${studio}.jpg`;
      return imageUrl;
    } catch (error) {
      console.error('Error al construir la URL de la imagen del estudio:', error);
      throw error;
    }
  }
};
