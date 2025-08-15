const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addPart(req, res) {
  try {
    const { emc, custpn, value, mpn1, mpn2 } = req.body;

    // Basic validation (optional)
    if (!emc || !custpn) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Add the stockcode data to the database
    const newStockcode = await prisma.stockcode.create({
      data: {
        emc,
        custpn,
        value,
        mpn1,
        mpn2,
      },
    });

    return res.status(201).json(newStockcode);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add stockcode" });
  }
}

module.exports = { addPart };
