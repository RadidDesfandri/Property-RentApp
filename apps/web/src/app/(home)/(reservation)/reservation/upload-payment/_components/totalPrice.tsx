
import ModalCancel from "./modalCancel";
import TimerComp from "./proofTimer";
import SummaryPay from "./summaryPay";


export default function TotalPrice() {
  return (
    <div className="flex flex-col gap-4 rounded-xl lg:max-w-[45%]">
      
      <h1 className="text-2xl font-semibold">Upload Bukti Pembayaran</h1>
      <SummaryPay/>
      <p className="text-justify lg:mb-4">
        Untuk memastikan kelancaran proses verifikasi, kami meminta Anda untuk
        mengunggah bukti pembayaran dalam waktu 1 jam setelah menerima pesan
        ini. Mohon pastikan bahwa bukti pembayaran yang diunggah jelas dan
        terbaca agar proses dapat berjalan dengan lancar. Jika ada pertanyaan
        atau kesulitan dalam mengunggah, jangan ragu untuk menghubungi kami.
        Terima kasih atas kerjasama Anda.
      </p>
  
      <ModalCancel/>
    </div>
  );
}
