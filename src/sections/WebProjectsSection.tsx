import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PcModel from "../components/Models/Scenes/PcModel";
import { useState } from "react";
import { track } from "@vercel/analytics";
import type { Projects } from "../utils/types";
import { Tooltip } from 'react-tooltip'
import { motion } from "motion/react";
import BubbleText from "../components/BubbleText";
import CustomButton from "../components/DrawOutlineButton";
import ProjectModal from "../components/ProjectModal";

const projects: Projects[] = [
  {
    name: "Alessia's Flat",
    description: "House rental platform built with Next.js and Hygraph.",
    url: "https://alessias-flat.vercel.app",
    icons: [{name: 'Next.js', url:'/nextjsLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}, {name: 'Maps API', url:'mapsLogo.png'}, {name: 'Zustand', url:'zustandLogo.svg'}, {name: 'EmailJS', url:'emailjsLogo.png'}],
    bullets: [
      "Headless CMS with Hygraph for property listings — editors update content without touching code",
      "Google Maps API integration for location display and nearby POI",
      "Zustand for lightweight global state (filters, booking flow) without Redux overhead",
      "EmailJS for serverless contact form — no backend needed for MVP",
    ]
  },
  {
    name: "DaysOf landing",
    description: "Landing page for days and nights of milan.",
    url: "https://days-of-chi.vercel.app/days",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}],
    bullets: [
      "Hygraph CMS drives all event content — new events published without deploys",
      "React with dynamic routing per event category (days vs nights)",
      "Responsive layout optimized for mobile-first discovery experience",
    ]
  },
  {
    name: "Alessandro Scafati's Portfolio",
    description: "A profesional portfolio showcasing Alessandro Scafati's work as an actor.",
    url: "https://www.alessandroscafati.it/",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Motion', url:'framerLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}],
    bullets: [
      "Simple and elegant design focused on showcasing the actor's showreel and credits",
      "Events section with dynamic filtering by role type (theater, film, tv) and date automatically parsed from Hygraph CMS",
      "Gallery section with masonry layout and lightbox for high-res images from photoshoots and performances",
    ]
  },
  {
    name: "AI Chat Assistant",
    description: "An AI-powered chat assistant trained on my info.",
    url: "https://portfolio-two-flax-84.vercel.app/#contacts",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'OpenAI API', url:'/openaiLogo.png'}],
    bullets: [
      "OpenAI API integration for context-aware conversational responses",
      "Trained on personal info to answer questions about my work and experience",
      "Real-time streaming responses for natural conversation flow",
    ],
    isTryable: true,
  },
  {
    name: "Portfolio",
    description: "The portfolio you are looking at right now.",
    url: "https://portfolio-two-flax-84.vercel.app",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Three.js', url:'threejsLogo.png'}, {name: 'GSAP', url:'gsapLogo.svg'}, {name: 'Motion', url:'framerLogo.png'}, {name: 'OpenAI API', url:'/openaiLogo.png'}],
    bullets: [
      "Three.js 3D models (PC, iPhone) render live website previews via iframe inside WebGL texture",
      "GSAP ScrollTrigger drives section entrance animations tied to scroll position",
      "OpenAI API powers the terminal chat — context-aware answers about my work",
      "Single-page SPA with hash-based navigation and IntersectionObserver for active nav state",
    ]
  }
]

const WebProjectsSection = () => {
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
              className="flex flex-col gap-3 overflow-y-auto max-h-screen pr-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer p-1 xl:p-4 rounded-lg hover:bg-black-200 transition ${activeProject === project.url ? 'bg-gradient-to-br from-indigo-300/70 to-indigo-900 drop-shadow-xl' : ''}`}
                  onClick={() => { setActiveProject(project.url); track('project_select', { project: project.name }); }}
                >
                  <div className="flex gap-1 items-center">
                    <div>
                      <h2 className="text-xl xl:text-2xl font-bold">{project.name}</h2>
                      <p className="text-white-50 text-md xl:text-lg">{project.description}</p>
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
                              <img src={icon.url} alt={icon.name} className="w-5 xl:w-7 h-5 xl:h-7" />
                            </a>
                            <Tooltip id="my-tooltip" />
                          </div>
                        </motion.nav>
                      ))}
                      </div>
                    </div>
                    {activeProject === project.url && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="ml-4"
                      >
                        <CustomButton
                          text={project.isTryable ? "Try" : "Details"}
                          sx="!p-2"
                          fontSize={14}
                          onClick={() => {
                            if (project.isTryable) {
                              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
                              track('project_try', { project: project.name });
                            } else {
                              setModalProject(project);
                              track('project_details', { project: project.name });
                            }
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
            <BubbleText text="WEB PROJECTS" style="text-8xl font-bold opacity-50 mt-8 tracking-tighter"/>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure className="hidden xl:flex">
          <div className="hero-3d-layout">
            <PcModel activeProject={activeProject}/>
          </div>
          <div className="absolute bottom-10 right-5">
            <p className="text-xs">*This is just a preview, the website graphics and functionalities might not work properly.</p>
          </div>
        </figure>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
};

export default WebProjectsSection;