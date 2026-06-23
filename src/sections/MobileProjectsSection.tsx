import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { track } from "@vercel/analytics";
import IphoneModel from "../components/Models/Scenes/IphoneModel";
import BubbleText from "../components/BubbleText";
import { motion } from "motion/react";
import type { Projects } from "../utils/types";
import CustomButton from "../components/DrawOutlineButton";
import ProjectModal from "../components/ProjectModal";

const projects: Projects[] = [
  {
    name: "Days of Milan App",
    description: "Restaurants, bars events and much more to explore.",
    url: "https://alessias-flat.vercel.app",
    showButton: false,
    bullets: [
      "React Native with Expo for cross-platform iOS/Android from single codebase",
      "Location-based filtering — content sorted by proximity using device GPS",
      "Offline-first architecture: events cached locally so app works in low connectivity",
      "Deep linking support for sharing specific venues directly from the app",
    ]
  },
]

const MobileProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<string>(projects[0].url);
  const [modalProject, setModalProject] = useState<Projects | null>(null);
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="mobile-projects-layout">
        {/* RIGHT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 overflow-auto items-end">
          <BubbleText text="MOBILE PROJECTS" style="text-7xl xl:text-8xl font-bold opacity-50 mb-8 tracking-tighter"/>
          <motion.div 
            className="flex flex-col gap-7 over w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex flex-col gap-10 overflow-y-auto max-h-screen pr-3">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer p-4 rounded-lg hover:bg-black-200 transition text-end ${activeProject === project.url ? 'bg-gradient-to-br from-indigo-300/70 to-indigo-900' : ''}`}
                  onClick={() => { setActiveProject(project.url); track('project_select', { project: project.name }); }}
                >
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <p className="text-white-50">{project.description}</p>
                  {activeProject === project.url && project.showButton && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="mt-2 flex justify-end"
                    >
                      <CustomButton
                        text="Details"
                        sx="!p-2"
                        fontSize={14}
                        onClick={() => { setModalProject(project); track('project_details', { project: project.name }); }}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </header>

        {/* LEFT: 3D Model or Visual */}
        <figure className="opacity-0 xl:opacity-100">
          <div className="hero-3d-layout-left">
            <IphoneModel activeProject={activeProject}/>
          </div>
        </figure>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
};

export default MobileProjectsSection;