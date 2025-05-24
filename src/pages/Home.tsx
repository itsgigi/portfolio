import WebProjectsSection from "../sections/WebProjectsSection"
import HeroSection from "../sections/HeroSection"
import MobileProjectsSection from "../sections/MobileProjectsSection"
import AboutSection from "../sections/AboutSection"
import ContactMeSection from "../sections/ContactMeSection"
import OtherProjectsSection from "../sections/OtherProjectsSection"

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section id="home" className="h-screen snap-start">
        <HeroSection />
      </section>
      <section id="about" className="h-screen snap-start">
        <AboutSection />
      </section>
      <section id="projects" className="h-screen snap-start">
        <WebProjectsSection />
      </section>
      <section className="h-screen snap-start">
        <MobileProjectsSection />
      </section>
      <section className="h-screen snap-start">
        <OtherProjectsSection />
      </section>
      <section id="contacts" className="h-screen snap-start">
        <ContactMeSection />
      </section>
    </div>
  )
}

export default Home