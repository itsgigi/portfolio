import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import type { Projects } from "../utils/types";
import CustomButton from "./DrawOutlineButton";

interface ProjectModalProps {
  project: Projects | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-slate-900/20 h-screen backdrop-blur p-8 fixed inset-0 z-[200] grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-indigo-300/70 to-indigo-900 text-white p-8 rounded-2xl w-full max-w-lg shadow-2xl cursor-default relative overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white text-2xl z-10 cursor-pointer"
            >
              <IoIosCloseCircleOutline />
            </button>

            <div className="relative z-10 flex flex-col gap-5">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
                <p className="text-white/70 mt-1 text-sm">{project.description}</p>
              </div>

              {project.icons && project.icons.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.icons.map((icon, i) => (
                    <div key={i}>
                      <a data-tooltip-id={`modal-tooltip-${i}`} data-tooltip-content={icon.name}>
                        <img src={icon.url} alt={icon.name} className="w-7 h-7" />
                      </a>
                      <Tooltip id={`modal-tooltip-${i}`} />
                    </div>
                  ))}
                </div>
              )}

              {project.bullets && project.bullets.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {project.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-2 items-start text-sm text-white/90"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              )}

              <a href={project.url} target="_blank" rel="noopener noreferrer" className="self-start mt-2">
                <CustomButton text="Visit Site" fontSize={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
