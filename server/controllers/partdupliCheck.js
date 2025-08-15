const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function partdupliCheck(req, res) {
  try {
    const { emc, custpn } = req.body;
    
    if (!emc && !custpn) {
      return res.status(400).json({ error: 'At least one of emc or custpn is required' });
    }

    const existing = await prisma.stockcode.findFirst({
      where: {
        OR: [
          { emc: emc || undefined },
          { custpn: custpn || undefined },
        ],
      },
    });

    if (existing) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  } catch (error) {
    console.error('Error in partDuplicateCheckController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { partdupliCheck };
