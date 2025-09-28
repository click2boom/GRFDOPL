import { proxys } from "../data"
import ProxyCard from "../components/ProxyCard"
import { useContext } from "react"
import Context from "../Context"
const ProxyList = () => {
  const {proxy,setProxy}= useContext(Context)
  return (
    <ul>
        {proxys.map((_proxy, index) =>
          <ProxyCard key={index}
            proxy={proxy}
            name={_proxy.name}
            url={_proxy.url}
             setProxy={setProxy}
          />
        )}
      </ul>
  )
}

export default ProxyList