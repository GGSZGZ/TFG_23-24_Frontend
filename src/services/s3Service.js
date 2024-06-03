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
  },

  async uploadImage(path, file) {
    const url = `https://${bucketName}.s3.amazonaws.com/${path}/${file.name}`;

    try {
      // Subir la imagen directamente
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        const responseBody = await uploadResponse.text();
        throw new Error(`Error al subir la imagen: ${uploadResponse.statusText}, Response: ${responseBody}`);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }
};
