import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PcModel from "../components/Models/Scenes/PcModel";
import { useState } from "react";
import type { Projects } from "../utils/types";
import { Tooltip } from 'react-tooltip'
import { motion } from "motion/react";
import BubbleText from "../components/BubbleText";

const projects: Projects[] = [
  {
    name: "Alessia’s Flat",
    description: "House rental platform built with Next.js and Hygraph.",
    url: "https://alessias-flat.vercel.app",
    icons: [{name: 'Next.js', url:'/nextjsLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}, {name: 'Maps API', url:'mapsLogo.png'}, {name: 'Zustand', url:'zustandLogo.svg'}, {name: 'EmailJS', url:'emailjsLogo.png'}]
  },
  {
    name: "DaysOf landing",
    description: "Landing page for days and nights of milan.",
    url: "https://days-of-chi.vercel.app/days",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}]
  },
  {
    name: "Portfolio",
    description: "The portfolio you are looking at right now.",
    url: "https://www.hotelolimpia.it/",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Three.js', url:'threejsLogo.png'}, {name: 'GSAP', url:'gsapLogo.svg'}, {name: 'Motion', url:'framerLogo.png'}, {name: 'OpenAI API', url:'/openaiLogo.png'}]
  }
]

const WebProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<string>(projects[0].url);
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 overflow-auto">
          
          <div className="flex flex-col gap-7 over">
            <motion.div
              className="flex flex-col gap-10 overflow-y-auto max-h-screen pr-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer p-4 rounded-lg hover:bg-black-200 transition ${activeProject === project.url ? 'bg-gradient-to-br from-indigo-300/70 to-indigo-900 drop-shadow-xl' : ''}`}
                  onClick={() => setActiveProject(project.url)}
                >
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <p className="text-white-50">{project.description}</p>
                  <div className="flex w-full gap-1 mt-1">
                  { activeProject === project.url && project.icons?.map((icon, index) => (
                    <motion.nav
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div>
                        <a data-tooltip-id="my-tooltip" data-tooltip-content={icon.name}>
                          <img src={icon.url} alt={icon.name} className="w-7 h-7" />
                        </a>
                        <Tooltip id="my-tooltip" />
                      </div>
                    </motion.nav>
                  ))}
                  </div>
                </div>
              ))}
            </motion.div>
            <BubbleText text="WEB PROJECTS" style="text-8xl font-bold opacity-50 mt-8 tracking-tighter"/>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <PcModel activeProject={activeProject}/>
          </div>
          <div className="absolute bottom-10 right-5">
            <p className="text-xs">*This is just a preview, the website graphics and functionalities might not work properly.</p>
          </div>
        </figure>
      </div>

    </section>
  );
};

export default WebProjectsSection;