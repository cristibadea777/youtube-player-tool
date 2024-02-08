import { useEffect, useState } from "react";
import "./App.css";
import { createDatabase, queryLibraryPlaylists } from "./DatabaseFunctions";
import { loadPlaylist } from "./PlaylistFunctions";
import MeniuDreapta from "./components/MeniuDreapta/MeniuDreapta";
import MeniuBiblioteca from "./components/Meniuri/MeniuBiblioteca/MeniuBiblioteca";
import MeniuPlaylist from './components/Meniuri/MeniuPlaylist/MeniuPlaylist';
import MeniuSetari from './components/Meniuri/MeniuSetari';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';


function App() {

  const [inputLink,        setInputLink]        = useState('')
  const [link,             setLink]             = useState('')
  const [indexClipCurent,  setIndexClipCurent]  = useState(0)
  const [labelPlaylist,    setLabelPlaylist]    = useState("Select a playlist first")
  const [playlistName,     setPlaylistName]     = useState('')
  const [playlistLength,   setPlaylistLength]   = useState('')
  const [playlistVideos,   setPlaylistVideos]   = useState([])
  const [libraryPlaylists, setLibraryPlaylists] = useState([])

  const loadLibrary = async () => {
    const playlists = await queryLibraryPlaylists()
    console.log(libraryPlaylists)
    setLibraryPlaylists(playlists)
  }

  useEffect(
    () => {
      loadLibrary()
    }, []
  )

  useEffect(
    () => {
      setIndexClipCurent(0)
      if(inputLink.includes('list=')){
        try {
          loadPlaylist(inputLink, setPlaylistVideos,  setPlaylistName, setPlaylistLength, setLabelPlaylist)
        } catch (error) {  }
      }
      else{ 
        setLink(inputLink) 
        setPlaylistVideos([])
      }
    }, [inputLink]
  )

  useEffect(
    () => {
      if(playlistVideos.length > 0) 
        setLink(playlistVideos[0]["video_url"])
    }, [playlistVideos]
  )

  useEffect(() => {
    if(playlistVideos.length > 0){ 
      setLink(playlistVideos[indexClipCurent]["video_url"]) 
    }
  }, [indexClipCurent])

  //pe viitor sa se poata seta in setari si luata
  const minWidth = "300px"

  const [viewSetari,      setViewSetari]      = useState(false)
  const [viewCut,         setViewCut]         = useState(false)
  const [viewPlaylist,    setViewPlaylist]    = useState(false)
  const [viewBiblioteca,  setViewBiblioteca]  = useState(false)

  useEffect(
    () => {
      //emptyDatabase()
      createDatabase()
    }, []
  )

  return (
    <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "flex-start", flexDirection: "row"}}>

      <div style={{width: minWidth, display: "flex", alignItems: "flex-start", flexDirection: "row"}}>
        <div style={{width: "80vw", height: "100vh"}}>
          <VideoPlayer 
            setIndexClipCurent = {setIndexClipCurent}
            setLink            = {setLink}
            link               = {link}
            playlistVideos     = {playlistVideos}
            indexClipCurent    = {indexClipCurent}
          />
        </div>
        <div style={{width: "20vw", height: "100vh", display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
          <MeniuDreapta  
            setInputLink      = {setInputLink}
            setViewSetari     = {setViewSetari}
            setViewCut        = {setViewCut}
            setViewPlaylist   = {setViewPlaylist}
            setViewBiblioteca = {setViewBiblioteca}
            playlistVideos    = {playlistVideos}
            viewSetari        = {viewSetari}
            viewBiblioteca    = {viewBiblioteca}
            viewCut           = {viewCut}
            viewPlaylist      = {viewPlaylist}
          />
        </div>
      </div>

      {viewSetari   && ( 
        <MeniuSetari 
        />   
      )}
      {viewPlaylist && ( 
        <MeniuPlaylist 
          playlistVideos      = {playlistVideos} 
          labelPlaylist       = {labelPlaylist}
          indexClipCurent     = {indexClipCurent}
          playlistName        = {playlistName}
          inputLink           = {inputLink}
          setLibraryPlaylists = {setLibraryPlaylists}
          setIndexClipCurent  = {setIndexClipCurent}
        /> 
      )}
      {viewBiblioteca && (
        <MeniuBiblioteca 
          libraryPlaylists = {libraryPlaylists}
          setInputLink     = {setInputLink}
        /> 
      )}

    </div>
  )
}

export default App;



