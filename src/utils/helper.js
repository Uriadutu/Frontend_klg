export function parseAndFormatDateString(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = parsedDate.getDate().toString().padStart(2, "0");
  
    return `${day}-${month}-${year}`;
  }

  
export const TanggalFormat = (tanggal) => {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const hari = tanggal.getDate();
  const bulanIndex = tanggal.getMonth();
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan[bulanIndex]} ${tahun}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};