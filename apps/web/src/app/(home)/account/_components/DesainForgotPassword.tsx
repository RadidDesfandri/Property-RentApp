import { Logo } from "@/components/Logo";

const DesainForgotPassword = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-latar">
      <div className="mx-auto flex w-[380px] max-w-7xl flex-col items-center rounded-md bg-white px-4 py-4 shadow-lg">
        <Logo colorBird="btn" colorText="hitam" size="scale-150" />
        <h1 className="mt-10 w-full text-start text-xl font-bold text-hitam">
          Lupa Password
        </h1>
        <p className="w-full text-start text-[10px] text-hitam mb-3">
          Masukkan email anda untuk reset password
        </p>
        {children}
      </div>
    </section>
  );
};

export default DesainForgotPassword;
