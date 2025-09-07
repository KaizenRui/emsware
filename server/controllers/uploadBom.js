const XLSX = require("xlsx");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function uploadBom(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length < 2) {
      return res.status(400).json({ error: "Excel has no data" });
    }

    const headers = jsonData[0];
    const headerMap = {};
    headers.forEach((header, i) => {
      if (!header) return;
      headerMap[header.toString().trim().toUpperCase()] = i;
    });

    const originalFileName = req.file.originalname || "default.xlsx";
    const bomName = originalFileName.replace(/\.[^/.]+$/, "");
    const now = new Date();

    const latestBom = await prisma.billofmaterials.findFirst({
      where: { bom_name: bomName },
      orderBy: { revisionno: "desc" },
    });

    let newRevision = parseInt(req.body.revisionno ?? 0);

    if (latestBom && newRevision <= latestBom.revisionno) {
      return res.status(400).json({
        error: `Invalid revision number. Latest revision is ${latestBom.revisionno}, new revision must be higher.`,
      });
    }

    const bom = await prisma.billofmaterials.create({
      data: {
        bom_name: bomName,
        revision_date: now,
        revisionno: newRevision,
        customer: req.body.customer,
        description: req.body.description,
      },
    });

    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (!row || row.length === 0) continue;

      const emc = row[headerMap["EMC STOCKCODE"]];
      const quantity = row[headerMap["QUANTITY"]];
      const pcb_side = row[headerMap["PCB SIDE"]];
      const custpn = row[headerMap["CUSTOMER PARTNUMBER"]];
      const value = row[headerMap["VALUE"]];
      const mpn1 = row[headerMap["MANUFACTURER PN"]] || "";
      const processdept =
        row[headerMap["PROCESS"]] || row[headerMap["PROCESS DEPT"]] || null;

      if (!emc) continue;

      let stockRecord = await prisma.stockcode.findFirst({
        where: { emc },
      });

      if (!stockRecord) {
        stockRecord = await prisma.stockcode.create({
          data: {
            emc,
            custpn: custpn || "",
            value: value || "",
            mpn1: mpn1 || "",
          },
        });
      }

      try {
        await prisma.bomitems.create({
          data: {
            bom_id: bom.bom_id,
            emc: stockRecord.emc,    
            custpn: custpn || null,
            quantity: quantity || 0,
            designators: row[headerMap["DESIGNATORS"]] || "",
            pcb_side: pcb_side || null,
            processdept: processdept,
            mpn1: mpn1 || stockRecord.mpn1 || "",
          },
        });
      } catch (e) {
        if (e.code === "P2002") {
          continue;
        }
        throw e;
      }
    }

    return res.json({
      message: `BOM (rev ${newRevision}) uploaded successfully`,
    });
  } catch (error) {
    console.error("Error processing BOM upload:", error);
    return res.status(500).json({ error: "Failed to process BOM file" });
  }
}

module.exports = { uploadBom };
