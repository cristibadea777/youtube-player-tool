import { currentMonitor, getCurrent } from "@tauri-apps/api/window"
import ButonBiblioteca from "./ButonBiblioteca"
import ButonCut from "./ButonCut"
import ButonDownload from "./ButonDownload"
import ButonPlaylist from "./ButonPlaylist"
import ButonSearch from "./ButonSearch"
import ButonSetari from "./ButonSetari"
import ButonUpload from "./ButonUpload"


const MeniuDreapta = ( {setInputLink, setSelectedLink, setPlaylistVideos, playlistVideos, viewSetari, viewBiblioteca, viewCut, viewPlaylist, setViewSetari, setViewCut, setViewPlaylist, setViewBiblioteca, viewDownload, setViewDownload, viewSearch, setViewSearch} ) => {
  
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
        setSelectedLink   = {setSelectedLink}
        setPlaylistVideos = {setPlaylistVideos}
      />
      
      <ButonPlaylist 
        resizeWindow    = {resizeWindow}
        viewPlaylist    = {viewPlaylist}
        viewBiblioteca  = {viewBiblioteca}
        setViewPlaylist = {setViewPlaylist}
        setViewSetari   = {setViewSetari}
        setViewCut      = {setViewCut}
        setViewDownload = {setViewDownload}
        setViewSearch   = {setViewSearch}
      />

      <ButonCut 
        resizeWindow      = {resizeWindow}
        viewCut           = {viewCut}
        setViewCut        = {setViewCut}
        setViewPlaylist   = {setViewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewSetari     = {setViewSetari}
        setViewDownload   = {setViewDownload}
        setViewSearch     = {setViewSearch}
      />

      <ButonBiblioteca
        resizeWindow      = {resizeWindow}
        viewBiblioteca    = {viewBiblioteca}
        viewPlaylist      = {viewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewSetari     = {setViewSetari}
        setViewCut        = {setViewCut}
        setViewDownload   = {setViewDownload}
        setViewSearch     = {setViewSearch}
      />

      <ButonSetari
        resizeWindow      = {resizeWindow}
        viewSetari        = {viewSetari}
        setViewSetari     = {setViewSetari}
        setViewPlaylist   = {setViewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewCut        = {setViewCut}
        setViewDownload   = {setViewDownload}
        setViewSearch     = {setViewSearch}
      />

      <ButonDownload
        resizeWindow      = {resizeWindow}
        viewDownload      = {viewDownload}
        setViewSetari     = {setViewSetari}
        setViewPlaylist   = {setViewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewCut        = {setViewCut}
        setViewDownload   = {setViewDownload}
        setViewSearch     = {setViewSearch}
      />

      <ButonSearch 
        resizeWindow      = {resizeWindow}
        viewSearch        = {viewSearch}
        setViewCut        = {setViewCut}
        setViewPlaylist   = {setViewPlaylist}
        setViewBiblioteca = {setViewBiblioteca}
        setViewSetari     = {setViewSetari}
        setViewDownload   = {setViewDownload}
        setViewSearch     = {setViewSearch}
      />



    </div>  
  )
    
}
export default MeniuDreapta