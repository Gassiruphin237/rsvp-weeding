import * as XLSX from "xlsx"

export function parseXlsGuests(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: "array" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet)

        const guests = json.map((row, index) => ({
          id: index,
          name: row.Nom || "",
          phone: String(row.Telephone || ""),
          guests_count: Number(row.Personnes || 1),
          is_attending: true,
          checked: true,
          duplicate: false,
        }))

        resolve(guests)
      } catch (err) {
        reject(err)
      }
    }

    reader.readAsArrayBuffer(file)
  })
}
