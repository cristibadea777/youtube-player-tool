 import { faArrowLeftLong, faArrowRightLong, faBookBookmark, faCog, faPause, faPlay, faUpload, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from '@tauri-apps/api/shell';
import { currentMonitor, getCurrent } from "@tauri-apps/api/window";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import "./App.css";


function App() {


  const resizeWindow = async (width) => {
      if(window.__TAURI__ !== undefined){ //doar pt desktop nu pt web
        const monitor = await currentMonitor()
        const physicalSize  = await getCurrent().innerSize()
        const scaleFactor = monitor.scaleFactor
        const logicalSize = physicalSize.toLogical(scaleFactor)
        logicalSize.width = width
        await getCurrent().setSize(logicalSize)
    }
  } 

  const [inputLink, setInputLink] = useState('')
  const [link,      setLink]      = useState('')
  const [index,     setIndex]     = useState(0)
  const [links,     setLinks]     = useState([])
  const [playing,   setPlaying]   = useState(false)
  const [muted,     setMuted]     = useState(false)

  const playerRef = useRef()
 
  const handleLoad = async () => {
    try{
      let input = await navigator.clipboard.readText()
      setInputLink(input)
    } catch { console.log("Error: " + error) }
  }

  useEffect(
    () => {

      setIndex(0)
      if(inputLink.includes('list=')){
        setLinks(['https://www.youtube.com/watch?v=cirDXY3CkSk', 'https://www.youtube.com/watch?v=-RAp9NT2tZY'])
      }
      else{ 
        setLink(inputLink) 
        setLinks([])
      }
    }, [inputLink]
  )

  useEffect(
    () => {
      if(links.length > 0) 
        setLink(links[0])
    }, [links]
  )

  useEffect(() => {
    if(links.length > 0){ 
      setLink(links[index]) 
    }
  }, [index])

  //daca avem linkuri in playlist atunci trece la urmatorul index, daca nu suntem la ultimul clip.
  //daca suntem la ultimul clip sau este doar un singur video, se deruleaza inapoi
  const handleEnded = () => {
    if(links.length > 0 && index !== links.loadedSeconds - 1){
      setLink(links[index+1])
      setIndex(index+1)
    } else {
      playerRef.current.seekTo(0, 'seconds')
    }
  }

  //preluare url-uri din playlist cu programul sidecar facut in python
  const testClick = async () => {
    try {
      console.log(link)
      const command = Command.sidecar('../bin/playlist_urls', [inputLink])
      const output = await command.execute()
      console.log(output.stdout)
    } catch (error) {
      console.log(error)     
    }
  }

  const handleOpenLibrary = () => {}
  const handleOpenSettings = () => {}

  return (
    <div style={{maxWidth: "100vw", maxHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column"}}>
      <div style={{width: "100%", height: link ? "10vh" : "96vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "1%"}}>
        <button onClick={handleOpenLibrary}> <FontAwesomeIcon icon={faBookBookmark}></FontAwesomeIcon></button> 
        <button onClick={handleLoad} style={{width:"50%"}}> <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon></button> 
        <button onClick={handleOpenSettings}> <FontAwesomeIcon icon={faCog}></FontAwesomeIcon></button> 
      </div>  
      {link && (
        <div style={{height: "86vh  ", width: "100vw"}}>
            <div style={{width: "100%", height: "80%", marginTop: "2%"}}>
              <ReactPlayer
                ref={playerRef}
                url={link}
                playing={playing}
                width={"100%"} 
                height={"100%"}
                onEnded={handleEnded}       
                muted={muted}
                onPlay={()=>{setPlaying(true)}}
                onPause={()=>{setPlaying(false)}}
                //daca s-a sfarsit clipul se pune pauza - daca este un singur clip sau ultimul clip din playlist
                onProgress={(progress) => {
                  if ( (progress.playedSeconds >= progress.loadedSeconds - 1) && (links.length === 0 || index === links.length - 1)) {
                    setPlaying(false);
                  }
                }}
              />
            </div>
            <div style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <button className={index === 0 ? "buton-disabled" : ""} disabled={index === 0} onClick={() => {setIndex(index - 1)}}><FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon></button>
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
              <button className={index === links.length - 1 ? "buton-disabled" : ""} disabled={index === links.length - 1} onClick={() => {setIndex(index + 1)}}><FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon></button>

              <button onClick={testClick}>TestPlaylist</button>
              <button onClick={() => {resizeWindow(510)}}>TestResize +</button>
              <button onClick={() => {resizeWindow(310)}}>TestResize -</button>
            </div>
        </div>
      )}
    </div>
  )
}
export default App;
