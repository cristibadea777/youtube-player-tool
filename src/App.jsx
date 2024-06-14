import { downloadDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import "./App.css";
import { createDatabase, queryLibraryPlaylists, queryPlaylist } from "./DatabaseFunctions";
import { loadPlaylist, loadPlaylistFromDatabase } from "./PlaylistFunctions";
import MeniuDreapta from "./components/MeniuDreapta/MeniuDreapta";
import MeniuBiblioteca from "./components/Meniuri/MeniuBiblioteca/MeniuBiblioteca";
import MeniuCut from "./components/Meniuri/MeniuCut/MeniuCut";
import MeniuDownload from "./components/Meniuri/MeniuDownload/MeniuDownload";
import MeniuPlaylist from './components/Meniuri/MeniuPlaylist/MeniuPlaylist';
import MeniuSetari from './components/Meniuri/MeniuSetari/MeniuSetari';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

  //TO DO: 

  //De vazut daca clipul este valid - cu python - se verifica in "handleLoad" in MeniuPrincipal

  //bara de "seek" in videoclip
  //butoane retro 
  //butoane inainte-inapoi 5 secunde

  //daca e playlist, se deschide si MeniuVizualizarePlaylist

  //download playlist - dupa ce se alege locatia (locatia stocata in sqlite) 

  //search - scrape pe youtube -- de facut

  //setari - backup/upload librarie, setare locatie
  //pt bd...sa vad cum se exporta bd...sau creez un txt cu info din bd...si la import citesc info si inserez 

  //filtrare clipuri in playlist si playlisturi in librarie 
  //buton loop

  //shuffle - activat se ia un clip random din lista

  ///DACA SE APASA DOWNLOAD -  se mareste fereastra si se arata ce clip este descarcat acum - cu buton close  
  //Downloading ...video/playlist nr/total
  //casuta input index start de download - index finish
//la descarcare se ia clipurile playlistului...clip cu clip, daca numele exista deja in download path nu se descarca, altfel se descarca

  //verificare la pornire daca nr clipuri din db sunt la fel cu cele din de pe net. daca nu, sa se faca update. dar nu cu await ca nu are rost

  //mutate sagetile de schimbat video inainte/inapoi sa fie duble sageti - la video nu la playlist

  //daca playlist exista deja in BD sa nu se mai puna / sa dispara si butonu din optiuni 


  //la cut -- daca se descarca nu mai pot face alt preview - de remediat

function App() {

  const [inputLink,         setInputLink]        = useState('') //link dat ca input
  const [selectedLink,      setSelectedLink]     = useState('') //link selectat din db
  const [link,              setLink]             = useState('') //linkul clipului curent. fie input fie selectat 
  const [title,             setTitle]            = useState('')
  const [indexClipCurent,   setIndexClipCurent]  = useState(0)
  const [labelPlaylist,     setLabelPlaylist]    = useState("Select a playlist first")
  const [playlistName,      setPlaylistName]     = useState('')
  const [playlistLength,    setPlaylistLength]   = useState('')
  const [playlistVideos,    setPlaylistVideos]   = useState([])
  const [libraryPlaylists,  setLibraryPlaylists] = useState([])

  const [downloadPath,      setDownloadPath]     = useState("")
  
  const loadLibrary = async () => {
    const playlists = await queryLibraryPlaylists()
    console.log(libraryPlaylists)
    setLibraryPlaylists(playlists)
  }

  const loadDownloadPath = async () => {
    const downloadDirPath = await downloadDir()
    setDownloadPath(downloadDirPath)
  }

  useEffect(
    () => {
      loadLibrary()
      loadDownloadPath()
    }, []
  )
 
  useEffect(
    () => {
      setIndexClipCurent(0)
      if(inputLink !== ''){
        if(inputLink.includes('list=')){
          try {
            loadPlaylist(inputLink, setPlaylistVideos,  setPlaylistName, setPlaylistLength, setLabelPlaylist)
          } catch (error) {  }
        }
        else{ 
          setLink(inputLink) 
          setPlaylistVideos([])
        }
      }
    }, [inputLink]
  )

  const loadPlaylistFromDb = async () => {
    let selectedPlaylist = await queryPlaylist(selectedLink)
    loadPlaylistFromDatabase(selectedPlaylist, setPlaylistVideos, setPlaylistName, setPlaylistLength, setLabelPlaylist)
  }

  //pentru playlist incarcat din DB, nu cand il incarcam cu Pytube atunci cand dam un link ca input
  useEffect(
    () => {
      if(selectedLink !== ''){
        try {
          loadPlaylistFromDb()
        } catch (error) {  }
      }
    }, [selectedLink]
  )

  useEffect(
    () => {
      if(playlistVideos.length > 0) {
        setLink(playlistVideos[0]["url_video"])
        setTitle(playlistVideos[0]["nume_video"])
      }
    }, [playlistVideos]
  )

  useEffect(() => {
    if(playlistVideos.length > 0){ 
      setLink(playlistVideos[indexClipCurent]["url_video"]) 
      setTitle(playlistVideos[indexClipCurent]["nume_video"])
    }
  }, [indexClipCurent])

  //pe viitor sa se poata seta in setari si luata
  const minWidth = "300px"

  const [viewSetari,      setViewSetari]      = useState(false)
  const [viewCut,         setViewCut]         = useState(false)
  const [viewPlaylist,    setViewPlaylist]    = useState(false)
  const [viewBiblioteca,  setViewBiblioteca]  = useState(false)
  const [viewDownload,    setViewDownload]    = useState(false)
  const [viewSearch,      setViewSearch]      = useState(false)

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
            setSelectedLink   = {setSelectedLink}
            setPlaylistVideos = {setPlaylistVideos}
            setViewSetari     = {setViewSetari}
            setViewCut        = {setViewCut}
            setViewPlaylist   = {setViewPlaylist}
            setViewBiblioteca = {setViewBiblioteca}
            setViewSearch     = {setViewSearch}
            setViewDownload   = {setViewDownload}
            playlistVideos    = {playlistVideos}
            viewSetari        = {viewSetari}
            viewBiblioteca    = {viewBiblioteca}
            viewCut           = {viewCut}
            viewPlaylist      = {viewPlaylist}
            viewDownload      = {viewDownload}
            viewSearch        = {viewSearch}
            inputLink         = {inputLink}
          />
        </div>
      </div>

      {viewSetari   && ( 
        <MeniuSetari 
        />   
      )}
      {viewCut && (
        <MeniuCut 
          link          = {link}
          title         = {title}
          downloadPath  = {downloadPath}
        />
      )}
      {viewPlaylist && ( 
        <MeniuPlaylist 
          playlistVideos      = {playlistVideos} 
          labelPlaylist       = {labelPlaylist}
          indexClipCurent     = {indexClipCurent}
          playlistName        = {playlistName}
          inputLink           = {inputLink}
          selectedLink        = {selectedLink}
          libraryPlaylists    = {libraryPlaylists}
          setLibraryPlaylists = {setLibraryPlaylists}
          setIndexClipCurent  = {setIndexClipCurent}
          setSelectedLink     = {setSelectedLink}
          setPlaylistVideos   = {setPlaylistVideos}
        /> 
      )}
      {viewBiblioteca && (
        <MeniuBiblioteca 
          libraryPlaylists    = {libraryPlaylists}
          selectedLink        = {selectedLink}
          setSelectedLink     = {setSelectedLink}
          setInputLink        = {setInputLink}
          setPlaylistVideos   = {setPlaylistVideos}
        /> 
      )}
      {viewDownload && (
        <MeniuDownload
        />
      )}

    </div>
  )
}

export default App;