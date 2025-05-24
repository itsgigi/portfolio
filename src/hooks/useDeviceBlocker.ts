import { useEffect, useState } from "react"

export function useDeviceBlocker(breakpoint = 1024) {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsBlocked(window.innerWidth < breakpoint)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [breakpoint])

  return isBlocked
}
