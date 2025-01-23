import './globals.css';
import Footer from '../../../components/Footer';
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer/>
    </div>
  )
}