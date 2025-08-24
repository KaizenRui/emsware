const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function queryBOM(req, res) {
  const { bom_name } = req.query;

  if (!bom_name || bom_name.trim() === "") {
    return res.status(400).json({ error: "bom_name is required" });
  }

  try {
    const items = await prisma.bomitems.findMany({
      where: {
        bom_name: bom_name
      },
      include: {
        part: true, 
        bom: true  
      }
    });

    const formatted = items.map((item) => ({
      emcStockCode: item.emc,
      quantity: item.quantity,
      designators: item.designators,
      pcbSide: item.pcb_side || "",
      customerPN: item.part?.custpn || "",
      value: item.part?.value || "",
      manufacturerPN: item.mpn1,
      process: item.processdept || ""
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { queryBOM };
