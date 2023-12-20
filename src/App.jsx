import ReactPlayer from "react-player/youtube";
import "./App.css";
import { useState } from "react";

function App() {

  const [link, setLink] = useState('')
  const [index, setIndex] = useState(0)
  const [links, setLinks] = useState([])
  const [play, setPlay] = useState(false)

  const handleChangeLink = (url) => {
    setIndex(0)
    if(url.includes('list=')){
      setLinks(['https://www.youtube.com/watch?v=cirDXY3CkSk', 'https://www.youtube.com/watch?v=-RAp9NT2tZY'])
      setLink(links[index])
    }
    else if(ReactPlayer.canPlay(url)) setLink(url)
    else { setLink('') }
  }

  const handleEnded = () => {
    if(links.length > 0){
      setLink(links[index+1])
      setIndex(index+1)
    }
  }

  const handlePlay = () => {
    setPlay(true)
  }

  return (
    <div style={{maxWidth: "100vw", maxHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column"}}>
      <div style={{width: "100%", height: "10vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <label style={{marginLeft: "7%", marginRight: "7%"}} htmlFor="inputLink">Link</label>
        <input style={{width: "100%", marginRight: "7%"}} onChange={(event)=>{handleChangeLink(event.target.value)}}></input>
      </div>
      {link && (
        <div style={{height: "86vh  ", width: "100vw"}}>
            <div style={{width: "100%", height: "80%", marginTop: "1%"}}>
              <ReactPlayer
                url={link}
                playing={play}
                width={"100%"} 
                height={"100%"}
                onReady={handlePlay} 
                onEnded={handleEnded}
              />
            </div>
            <div style={{width: "100%", height: "20%", backgroundColor: "yellow"}}>
            </div>
        </div>
      )}
    </div>
  )
}
export default App;
