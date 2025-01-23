export function formatDateReservation(date: Date | null) {
  // Daftar nama hari dan bulan
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const dayName = date ? days[date.getDay()] : null;
  const day = date ? date.getDate() : null;
  const monthName = date ? months[date.getMonth()] : null;
  const year = date ? date.getFullYear() : null;
  return `${dayName},${day} ${monthName} ${year}`;
}
