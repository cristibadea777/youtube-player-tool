import ReactPlayer from "react-player/youtube";
import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faDiagramNext, faPause, faPlay, faVolumeHigh, faVolumeMute, faVolumeOff } from "@fortawesome/free-solid-svg-icons";

function App() {

  const [input,    setInput]    = useState('')
  const [link,     setLink]     = useState('')
  const [index,    setIndex]    = useState(0)
  const [links,    setLinks]    = useState([])
  const [playing,  setPlaying]  = useState(false)
  const [muted,    setMuted]    = useState(false)

  const handleLoad = () => {
    console.log(playing)
    setIndex(0)
    if(input.includes('list=')){
      setLinks(['https://www.youtube.com/watch?v=cirDXY3CkSk', 'https://www.youtube.com/watch?v=-RAp9NT2tZY'])
      setLink(links[0])
    }
    else setLink(input)
  }

  useEffect(() => {
    setLink(links[0])
  }, [index])

  const handleEnded = () => {
    if(links.length > 0){
      setLink(links[index+1])
      setIndex(index+1)
    }
  }

  return (
    <div style={{maxWidth: "100vw", maxHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column"}}>
      <div style={{width: "100%", height: "10vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <label style={{marginLeft: "7%", marginRight: "7%"}} htmlFor="inputLink">Link</label>
        <input style={{width: "100%", marginRight: "7%"}} onChange={(event)=>{setInput(event.target.value)}}></input>
        <button onClick={handleLoad}>Load</button>
      </div>
      {link && (
        <div style={{height: "86vh  ", width: "100vw"}}>
            <div style={{width: "100%", height: "80%", marginTop: "1%"}}>
              <ReactPlayer
                url={link}
                playing={playing}
                width={"100%"} 
                height={"100%"}
                onEnded={handleEnded}
                muted={muted}
                onPlay={()=>{setPlaying(true)}}
                onPause={()=>{setPlaying(false)}}
              />
            </div>
            <div style={{width: "100%", height: "20%", backgroundColor: "yellow"}}>
              <button onClick={() => {setPlaying(!playing)} }> 
                {!playing ? (
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                )}
              </button>
              <button onClick={() => {setMuted(!muted)} }> 
                {!muted ? (
                  <FontAwesomeIcon icon={faVolumeMute}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>
                )}
              </button>
              <button onClick={() => {setIndex(index + 1)}}><FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon></button>
            </div>
        </div>
      )}
    </div>
  )
}
export default App;
