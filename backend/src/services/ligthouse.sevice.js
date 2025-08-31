const lighthouse = require('@lighthouse-web3/sdk');
const fetch = require('node-fetch');
const fs = require('fs');

const apiKey = process.env.LIGHTHOUSE_API_KEY;

/**
 * Subir un archivo (imagen, pdf, carpeta, etc.)
 * @param {string} filePath - Ruta del archivo local
 * @returns {Promise<string>} - Retorna el CID de IPFS (ipfs://CID)
 */
const uploadFile = async (filePath) => {
  try {
    const uploadResponse = await lighthouse.upload(filePath, apiKey);
    return `ipfs://${uploadResponse.data.Hash}`;
  } catch (err) {
    console.error('Error subiendo archivo a Lighthouse:', err);
    throw err;
  }
};

/**
 * Subir un JSON o texto plano como archivo en IPFS
 * @param {object|string} data - Objeto JSON o string
 * @param {string} name - Nombre opcional para el archivo
 * @returns {Promise<string>} - Retorna el CID de IPFS (ipfs://CID)
 */
const uploadJSON = async (data, name = 'metadata.json') => {
  try {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const response = await lighthouse.uploadText(payload, apiKey, name);
    return `ipfs://${response.data.Hash}`;
  } catch (err) {
    console.error('Error subiendo JSON a Lighthouse:', err);
    throw err;
  }
};

/**
 * Obtener info de un archivo en Lighthouse/IPFS
 * @param {string} cid - CID de IPFS
 * @returns {Promise<object>} - Información del archivo
 */
const getFileInfo = async (cid) => {
  try {
    const fileInfo = await lighthouse.getFileInfo(cid);
    return fileInfo.data;
  } catch (err) {
    console.error('Error obteniendo info de archivo:', err);
    throw err;
  }
};

/**
 * Descargar una imagen desde Lighthouse con resize
 * @param {string} cid - CID de la imagen en IPFS
 * @param {number} height - Alto en píxeles
 * @param {number} width - Ancho en píxeles
 * @param {string} outputPath - Ruta local donde guardar
 */
const resizeImage = async (cid, height, width, outputPath) => {
  try {
    const url = `https://gateway.lighthouse.storage/ipfs/${cid}?h=${height}&w=${width}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo descargar la imagen');

    const buffer = await response.buffer();
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Imagen redimensionada guardada en ${outputPath}`);
  } catch (err) {
    console.error('Error redimensionando imagen:', err);
    throw err;
  }
};

module.exports = {
  uploadFile,
  uploadJSON,
  getFileInfo,
  resizeImage,
};
