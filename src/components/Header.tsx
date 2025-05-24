import { useEffect, useState } from 'react'

const sections = ['home', 'about', 'projects', 'contacts']

const Header = () => {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // section is considered active when 50% visible
      }
    )
  
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  
    return () => observer.disconnect()
  }, [])  

  return (
    <div className="absolute top-0 flex w-full items-center justify-between z-100 rounded-full">
      <img src="/logo.png" className="h-30 w-30"/>
      <header className="navbar">
        <nav className="desktop">
          <ul className="flex gap-2">
            {sections.map(section => (
              <li key={section} className={`group ${active === section ? 'opacity-100' : 'opacity-20'}`}>
                <a href={`#${section}`} onClick={() => setActive(section)} className="transition-colors duration-300">
                  <span className="uppercase">{section}</span>
                  <span className="underline block h-[2px] bg-current mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header