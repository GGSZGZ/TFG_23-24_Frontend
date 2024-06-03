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
    const url = `https://tfgisggs.s3.amazonaws.com/${path}/${file.name}`;
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Verificar si la carpeta del juego existe
        const folderExistsResponse = await fetch(`https://tfgisggs.s3.amazonaws.com/${path}`, {
            method: 'HEAD'
        });

        if (!folderExistsResponse.ok) {
            // La carpeta del juego no existe, intenta crearla
            const createFolderResponse = await fetch(`https://tfgisggs.s3.amazonaws.com/${path}`, {
                method: 'PUT',
                headers: {
                    'x-amz-acl': 'public-read'
                }
            });

            if (!createFolderResponse.ok) {
                throw new Error(`Error al crear la carpeta del juego: ${createFolderResponse.statusText}`);
            }
        }

        // Subir la imagen
        const uploadResponse = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read'
            }
        });

        if (!uploadResponse.ok) {
            throw new Error(`Error al subir la imagen: ${uploadResponse.statusText}`);
        }
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
},
  async createStudioFolder(studioID) {
    const folderPath = `Studio${studioID}`;

    try {
        // Verificar si la carpeta del estudio ya existe
        const folderExistsResponse = await fetch(`https://tfgisggs.s3.amazonaws.com/${folderPath}`, {
            method: 'HEAD'
        });

        if (!folderExistsResponse.ok) {
            // La carpeta del estudio no existe, intenta crearla
            const createFolderResponse = await fetch(`https://tfgisggs.s3.amazonaws.com/${folderPath}`, {
                method: 'PUT',
                headers: {
                    'x-amz-acl': 'public-read'
                }
            });

            if (!createFolderResponse.ok) {
                throw new Error(`Error al crear la carpeta del estudio: ${createFolderResponse.statusText}`);
            }
        } else {
            console.log(`La carpeta del estudio ${folderPath} ya existe.`);
        }
    } catch (error) {
        console.error('Error al crear la carpeta del estudio:', error);
        throw error;
    }
}

};


