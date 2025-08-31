const { batchContract } = require("./../config/contracts");
const { uploadJSON } = require("./../services/ligthouse.sevice");

exports.createBatch = async (req, res) => {
  try {
    const { productor, metadata } = req.body;

    // 1. Subir metadata a Lighthouse (IPFS)
    const metadataCID = await uploadJSON(metadata);

    // 2. Crear batch en contrato
    const tx = await batchContract.mintBatchSBT(productor, metadataCID);
    const receipt = await tx.wait();

    // 3. Obtener el batchId del evento
    const event = receipt.logs
      .map(log => {
        try { return batchContract.interface.parseLog(log); } catch { return null; }
      })
      .filter(e => e && e.name === "BatchMinted")[0];

    const batchId = event.args.batchId.toString();

    res.json({ batchId, productor, metadataCID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando batch" });
  }
};

exports.getBatchMetadata = async (req, res) => {
  try {
    const { batchId } = req.params;

    const metadataURI = await batchContract.getBatchMetadata(batchId);
    const certifications = await batchContract.getCertifications(batchId);

    res.json({ batchId, metadataURI, certifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo metadata" });
  }
};
