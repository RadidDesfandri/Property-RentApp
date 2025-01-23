export const formatRupiah = (input: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(input);
};
  
export function formatRupiahNoRP(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(amount);
}

