# Backend Blockchain con Next.js + Ethers + Lighthouse

Este proyecto implementa un backend en **Node.js con TypeScript** que interactúa con contratos inteligentes ya desplegados en la blockchain. Además, permite almacenar imágenes y metadatos en **IPFS a través de Lighthouse**.

---

## 🚀 Características

- Conexión a contratos inteligentes mediante **ethers.js**.  
- Uso de **Lighthouse SDK** para guardar imágenes en IPFS.  
- Endpoints bien estructurados siguiendo buenas prácticas de arquitectura.  
- Controlador de **trazabilidad (TraceabilityController)** para registrar interacciones y eventos.  

---

## 📦 Instalación de librerías necesarias

Ejecuta los siguientes comandos para instalar las dependencias:

```sh
npm install ethers dotenv express cors body-parser lighthouse-web3
npm install --save-dev typescript ts-node @types/node @types/express
```

---

## ⚙️ Configuración del proyecto

1. Crear archivo **tsconfig.json** para compilar con TypeScript.
2. Crear archivo **.env** con las variables necesarias:

```env
RPC_URL=https://your_rpc_url
PRIVATE_KEY=tu_private_key
CONTRACT_ADDRESS=0x1234567890abcdef...
LIGHTHOUSE_API_KEY=tu_api_key
PORT=4000
```

---

## 📂 Estructura del proyecto

```txt
backend/
│── src/
│   ├── controllers/
│   │   ├── traceability.controller.ts
│   ├── services/
│   │   ├── contract.service.ts
│   │   ├── ipfs.service.ts
│   ├── routes/
│   │   ├── index.ts
│   ├── index.ts
│── package.json
│── tsconfig.json
│── .env
```

---

## 🛠️ Endpoints principales

### Subida de imagen a IPFS
```http
POST /api/ipfs/upload
```  
**Body (form-data):**
- file: imagen a subir  

**Respuesta:**
```json
{
  "cid": "Qmabc123...",
  "url": "https://gateway.lighthouse.storage/ipfs/Qmabc123..."
}
```

---

### Guardar metadatos en IPFS
```http
POST /api/ipfs/metadata
```  
**Body (JSON):**
```json
{
  "name": "Mi NFT",
  "description": "Un NFT dinámico",
  "image": "https://gateway.lighthouse.storage/ipfs/Qmabc123..."
}
```

**Respuesta:**
```json
{
  "cid": "Qmxyz789...",
  "url": "https://gateway.lighthouse.storage/ipfs/Qmxyz789..."
}
```

---

### Interacción con contrato inteligente
```http
POST /api/contract/execute
```  
**Body (JSON):**
```json
{
  "functionName": "mintNFT",
  "args": ["0xabc123...", "ipfs://Qmxyz789..."]
}
```

---

### Consultar trazabilidad
``http
GET /api/traceability/:id
``  

---

## 🧪 Ejecución en desarrollo

```sh
npm run dev
```

En producción:

```sh
npm run build
npm start
```

---

## ✅ Buenas prácticas aplicadas
- Separación en **controllers, services y routes**.  
- Uso de **dotenv** para configuración segura.  

---

## 📌 Notas
- Asegúrate de tener saldo suficiente en la red blockchain para ejecutar transacciones.  
- Lighthouse requiere un **API Key** válido.  
- La red configurada en `RPC_URL` no soporta ENS, por lo que las direcciones deben ser pasadas directamente en formato **0x...**.  

## 🚀 Despliegue de contratos

Para desplegar los contratos en la red Lisk Sepolia:

```sh
npx hardhat run scripts/deploy.js --network lisk-sepolia
```

Esto ejecutará tu script de despliegue y mostrará las direcciones de los contratos desplegados.

---

## ✅ Verificación de contratos en Blockscout

Para verificar los contratos y su código fuente:

```sh
npx hardhat run scripts/verify.js --network lisk-sepolia
```

Esto permite que tu contrato sea público y verificable en **Blockscout Sepolia**.

---

## 📝 Notas importantes

- Asegúrate de que la **clave privada** en `.env` tenga fondos suficientes para cubrir las transacciones.  
- Revisa que las direcciones y parámetros en los scripts coincidan con tu lógica de despliegue.  
- Hardhat soporta múltiples redes; solo asegúrate de especificar `--network lisk-sepolia` al ejecutar los scripts.  
- Verifica siempre que los contratos compilados sean compatibles con la versión de Solidity indicada en `hardhat.config.js`.  
