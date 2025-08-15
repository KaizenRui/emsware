const XLSX = require("xlsx");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function uploadBom(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Step 1: Read Excel
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length < 2) {
      return res.status(400).json({ error: "Excel has no data" });
    }

    // Step 2: Normalize headers
    const headers = jsonData[0];
    const headerMap = {};
    headers.forEach((header, i) => {
      if (!header) return;
      headerMap[header.toString().trim().toUpperCase()] = i;
    });

    // Step 3: Extract BOM name from filename
    const originalFileName = req.file.originalname || "default.xlsx";
    const bomName = originalFileName.replace(/\.[^/.]+$/, "");

    // Step 4: Check if BOM exists and handle revision_date
    const now = new Date();
    let bom = await prisma.billofmaterials.findFirst({
      where: { bom_name: bomName },
    });

    if (!bom) {
      bom = await prisma.billofmaterials.create({
        data: {
          bom_name: bomName,
          revision_date: now,
        },
      });
    } else {
      bom = await prisma.billofmaterials.update({
        where: { bom_id: bom.bom_id },
        data: { revision_date: now },
      });
    }

    // Step 5: Process each row
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

      if (!emc) continue; // skip rows without EMC

      // Step 6: Check if stockcode exists
      const stock = await prisma.stockcode.findUnique({
        where: { emc },
      });

      let stockRecord = stock;
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

      // Step 7: Always add bomitems, linking to stock
      await prisma.bomitems.create({
        data: {
          bom_id: bom.bom_id,
          bom_name: bom.bom_name,
          emc: stockRecord.emc,
          quantity: quantity || 0,
          designators: row[headerMap["DESIGNATORS"]] || "",
          pcb_side: pcb_side || null,
          processdept: processdept,
          mpn1: mpn1 || stockRecord.mpn1 || "",
        },
      });
    }

    return res.json({ message: "BOM uploaded and processed successfully" });
  } catch (error) {
    console.error("Error processing BOM upload:", error);
    return res.status(500).json({ error: "Failed to process BOM file" });
  }
}

module.exports = { uploadBom };
