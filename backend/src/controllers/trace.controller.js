const { traceContract } = require("../config/contracts");

exports.addEvent = async (req, res) => {
  try {
    const { batchId, etapa, eventHash, timestamp, evidenceCID } = req.body;

    const tx = await traceContract.addEvent(batchId, etapa, eventHash, timestamp, evidenceCID);
    await tx.wait();

    res.json({ batchId, etapa, eventHash, evidenceCID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error agregando evento" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { batchId } = req.params;
    const events = await traceContract.getEvents(batchId);

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo eventos" });
  }
};
