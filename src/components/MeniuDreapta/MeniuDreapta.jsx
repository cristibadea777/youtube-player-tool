import { currentMonitor, getCurrent } from "@tauri-apps/api/window"
import ButonCut from "./ButonCut"
import ButonLibrary from "./ButonLibrary"
import ButonPlaylist from "./ButonPlaylist"
import ButonSetari from "./ButonSetari"
import ButonUpload from "./ButonUpload"


const MeniuDreapta = ( {setInputLink, playlistVideos, viewSetari, viewLibrary, viewCut, viewPlaylist, setViewSetari, setViewLibrary, setViewCut, setViewPlaylist} ) => {
  
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

  return (
    <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", backgroundColor: "#201c1c"}}>
      <ButonUpload 
        setInputLink ={setInputLink} 
      />
      
      <ButonPlaylist 
        resizeWindow    = {resizeWindow}
        viewPlaylist    = {viewPlaylist}
        setViewPlaylist = {setViewPlaylist}
        setViewSetari   = {setViewSetari}
      />

      <ButonCut 
      />

      <ButonLibrary
      />

      <ButonSetari
        resizeWindow    = {resizeWindow}
        viewSetari      = {viewSetari}
        setViewSetari   = {setViewSetari}
        setViewPlaylist = {setViewPlaylist}
      />
    </div>  
  )
    
}
export default MeniuDreapta