// controllers/searchStock.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchPart(req, res) {
  const { stockcode } = req.body;
  
  if (!stockcode) return res.status(400).json({ error: 'stockcode is required' });

  try {
    const rows = await prisma.stockcode.findMany({
      where: {
        OR: [
          {
            emc: {
              contains: stockcode,
              mode: 'insensitive',
            },
          },
          {
            custpn: {
              contains: stockcode,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    if (rows.length === 0)
      return res.status(404).json({ message: 'No matching records found' });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { searchPart };
