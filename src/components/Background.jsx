import { useState,useEffect } from "react"
import { imagesApi } from "../data"

 const Background = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < window.innerHeight)
  }, [isMobile])
  return (
        <i id="background" style={{
      backgroundImage: `url("${isMobile ? imagesApi.mobile : imagesApi.desktop}")`
    }} />
  )
}
export default Background
