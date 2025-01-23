import { RiCloseLargeLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
        <button className="text-xl hover:bg-black/10 px-2 py-2 rounded-full" onClick={onClose}>
        <RiCloseLargeLine />
        </button>
        <div className="px-4">

        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
