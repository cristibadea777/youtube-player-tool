import { currentMonitor, getCurrent } from "@tauri-apps/api/window"
import ButonBiblioteca from "./ButonBiblioteca"
import ButonCut from "./ButonCut"
import ButonPlaylist from "./ButonPlaylist"
import ButonSetari from "./ButonSetari"
import ButonUpload from "./ButonUpload"


const MeniuDreapta = ( {setInputLink, setPlaylistVideos, playlistVideos, viewSetari, viewBiblioteca, viewCut, viewPlaylist, setViewSetari, setViewCut, setViewPlaylist, setViewBiblioteca} ) => {
  
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
        setInputLink      = {setInputLink} 
        setPlaylistVideos = {setPlaylistVideos}
      />
      
      <ButonPlaylist 
        resizeWindow    = {resizeWindow}
        viewPlaylist    = {viewPlaylist}
        viewBiblioteca  = {viewBiblioteca}
        setViewPlaylist = {setViewPlaylist}
        setViewSetari   = {setViewSetari}
      />

      <ButonCut 
      />

      <ButonBiblioteca
        resizeWindow      = {resizeWindow}
        viewBiblioteca    = {viewBiblioteca}
        viewPlaylist      = {viewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewSetari     = {setViewSetari}
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