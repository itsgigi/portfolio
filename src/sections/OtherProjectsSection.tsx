import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import type { Projects } from "../utils/types";
import { Tooltip } from 'react-tooltip'
import { motion } from "motion/react";
import BubbleText from "../components/BubbleText";
import { DragCards } from "../components/DragCards";
import CustomButton from "../components/DrawOutlineButton";
import ProjectModal from "../components/ProjectModal";

const projects: Projects[] = [
  {
    name: "Nights of milan",
    description: "Turning online connections into offline experiences.",
    url: "https://alessias-flat.vercel.app",
    showButton: false,
    bullets: [
      "Event-driven social platform connecting strangers through curated Milan nightlife experiences",
      "Real-time RSVP system built to handle concurrent attendee updates without conflicts",
      "Moderation layer for user-generated event proposals before going live",
      "Analytics dashboard for organizers tracking attendance trends and engagement",
    ]
  },
]

const OtherProjectsSection = () => {
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
                  <div className="flex items-center gap-4 w-fit">
                    <div>
                      <h2 className="text-2xl font-bold">{project.name}</h2>
                      <p className="text-white-50">{project.description}</p>
                    </div>
                    {activeProject === project.url && project.showButton && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CustomButton
                          text="Details"
                          sx="!p-2"
                          fontSize={14}
                          onClick={() => setModalProject(project)}
                        />
                      </motion.div>
                    )}
                  </div>
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
                          <img src={icon.url} alt={icon.name} className="w-4 xl:w-7 h-4 xl:h-7" />
                        </a>
                        <Tooltip id="my-tooltip" />
                      </div>
                    </motion.nav>
                  ))}
                  </div>
                </div>
              ))}
            </motion.div>
            <BubbleText text="OTHER PROJECTS" style="text-7xl xl:text-8xl font-bold opacity-50 mt-8 tracking-tighter"/>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure className="opacity-0 xl:opacity-100">
          <div className="hero-card-layout">
            <DragCards />
          </div>
        </figure>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
};

export default OtherProjectsSection;