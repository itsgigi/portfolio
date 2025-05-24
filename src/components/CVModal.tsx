/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { RiReactjsLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CVModalProps {
    isOpen: boolean,
    onClose: any,
    children: any,
}

const CVModal = ({
  isOpen,
  onClose,
  children
}: CVModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-slate-900/20 h-screen backdrop-blur p-8 fixed inset-0 z-100 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-indigo-300/70 to-indigo-900 text-white p-6 rounded-lg w-full shadow-xl cursor-default relative overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-1 right-2 text-white text-xl font-bold z-100 cursor-pointer"><IoIosCloseCircleOutline /></button>
            <RiReactjsLine className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
            <div className="bg-white rounded-lg shadow-lg h-[70vh] relative overflow-hidden">                
                <div className="w-full h-full z-0">{children}</div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;