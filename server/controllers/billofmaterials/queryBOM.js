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
        bom: {
          bom_name: bom_name, // ✅ filter via relation
        },
      },
      include: {
        part: true,
        bom: true
      }
    });


    const formatted = items.map((item) => ({
      designators: item.designators,
      value: item.part?.value || "",
      process: item.processdept || "",
      pcbSide: item.pcb_side || "",
      quantity: item.quantity,
      emcStockCode: item.emc,
      customerPN: item.part?.custpn || "",
      manufacturerPN: item.mpn1,
    }));


    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { queryBOM };
