import { motion } from "framer-motion"
import CustomButton from "../components/DrawOutlineButton"
import BubbleText from "../components/BubbleText"
import { GrDocumentUser } from "react-icons/gr";
import { useState } from "react";
import CVModal from "../components/CVModal";
import type { Icon } from "../utils/types";
import { Tooltip } from "react-tooltip";
import { FaGithub } from "react-icons/fa";

const icons: Icon[] = [
  {name: 'React.js', url:'/reactLogo.png'}, {name: 'Next.js', url:'/nextjsLogo.png'}, {name: 'React Native', url:'/reactNativeLogo.svg'}, {name: 'JavaScript', url:'/javascriptLogo.png'}, {name: 'TypeScript', url:'/typescriptLogo.png'}, {name: 'OpenAI API', url:'/openaiLogo.png'}
]

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <motion.div
      className="h-[80vh] w-screen flex flex-col items-center text-center justify-center px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <BubbleText text="ABOUT ME" style="text-7xl xl:text-8xl font-bold opacity-50 mb-8 tracking-tighter"/>
      <div className="flex flex-col md:flex-row justify-center gap-0 mb-8 relative w-full max-w-5xl shadow-xl">
        {/* Left: Image */}
        <div className="relative w-full md:w-[280px] flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
          <img
            src="/luigi.jpeg"
            alt="luigi's photo"
            className="w-[180px] md:w-[280px] h-auto object-cover aspect-square rounded-bl-2xl rounded-tl-2xl z-0 opacity-85"
          />
          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-indigo-300 z-10" />
        </div>
        {/* Right: Content Box */}
        <div className="relative flex flex-col items-center z-10 bg-gradient-to-r from-indigo-300 to-indigo-900 rounded-r-2xl p-4 md:p-6 flex-1 overflow-hidden w-full">
          <p className="text-white mt-4">
            Hi, I'm Luigi — a passionate Frontend Developer with a strong focus on React, Next.js, and creative user experiences. I bring together technical expertise and design thinking to craft intuitive, performant web apps. My journey includes leading a frontend of proprietary software, integrating AI solutions, and pushing boundaries with 3D interfaces using Three.js. I thrive in dynamic teams and enjoy bridging the gap between technology and real-world impact. Here's my most used technologies:
          </p>
          <div className="flex gap-2 mt-4">
            {icons?.map((icon, index) => (
              <motion.nav
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <div>
                  <a data-tooltip-id="my-tooltip" data-tooltip-content={icon.name}>
                    <img src={icon.url} alt={icon.name} className="w-9 h-9" />
                  </a>
                  <Tooltip id="my-tooltip" />
                </div>
              </motion.nav>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div>
          <a data-tooltip-id="my-tooltip" data-tooltip-content={"CV"}>
            <CustomButton text="" child={<GrDocumentUser size={30}/>} onClick={() => setIsModalOpen(true)} />
          </a>
          <Tooltip id="my-tooltip" />
        </div>
        <div>
          <a
            href="https://github.com/itsgigi"
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip-id="my-tooltip2"
            data-tooltip-content="GitHub"
          >
            <CustomButton text="" child={<FaGithub size={30} />} />
          </a>
          <Tooltip id="my-tooltip2" />
        </div>
      </div>

      {/* PDF Preview Modal */}
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <iframe
          src="/LuigiDiLoretoCV.pdf"
          className="w-full h-full"
          title="CV PDF Preview"
        />
      </CVModal>
    </motion.div>
  )
}

export default AboutSection
