import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <div className="w-full justify-self-end bg-hitam py-5">
      <div className="mx-auto max-w-7xl px-10 -z-40">
        <main className="flex flex-col rounded-sm border-b-2 border-gray-600 pb-12 md:flex-row md:justify-between">
          <div className="text-sm grayscale md:w-1/2">
            <Logo colorBird="btn" colorText="btn" size="scale-100" />
            <p className="mb-2 mt-5 text-gray-400">nezztarrcomp@gmail.com</p>
            <p className="text-gray-400">+1(201) 895-1234</p>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2">
            <div className="flex justify-between">
              <section className="flex flex-col gap-2 text-sm font-medium text-gray-400">
                <p>Company</p>
                <p>Blog</p>
                <p>Careers</p>
                <p>Pricing</p>
              </section>
              <section className="flex flex-col gap-2 text-sm font-medium text-gray-400">
                <p>Resources</p>
                <p>Documentation</p>
                <p>Papers</p>
                <p>Press Conferences</p>
              </section>
              <section className="flex flex-col gap-2 text-sm font-medium text-gray-400">
                <p>Legal</p>
                <p>Term and service</p>
                <p>Privacy Policy</p>
                <p>Cookies Policy</p>
              </section>
            </div>
          </div>
        </main>
        <main className="flex items-center justify-between pt-8 text-sm font-medium text-gray-400">
          <p>©2024 Nezztarr Inc</p>
          <div className="flex gap-4 grayscale">
            <FaInstagram className="h-5 w-5" />
            <FaFacebook className="h-5 w-5" />
            <FaXTwitter className="h-5 w-5" />
          </div>
        </main>
      </div>
    </div>
  );
}
