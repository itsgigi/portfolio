import WebProjectsSection from "../sections/WebProjectsSection"
import HeroSection from "../sections/HeroSection"
import MobileProjectsSection from "../sections/MobileProjectsSection"
import AboutSection from "../sections/AboutSection"
import ContactMeSection from "../sections/ContactMeSection"
import OtherProjectsSection from "../sections/OtherProjectsSection"
import { useDeviceBlocker } from "../hooks/useDeviceBlocker"

const DeviceBlockModal = () => (
  //#2e2d41, #13121c
  <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2e2d41] to-[#13121c] text-white flex flex-col items-center justify-center p-4">
    <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
    <p className="text-center max-w-md">
      This website is only available on desktop. Please access it from a larger screen for the best experience.
    </p>
  </div>
)

const Home = () => {
  const isBlocked = useDeviceBlocker()

  return (
    <>
      {isBlocked && <DeviceBlockModal />}
      <div className={`h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth ${isBlocked ? "overflow-hidden" : ""}`}>
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
    </>
  )
}

export default Home
