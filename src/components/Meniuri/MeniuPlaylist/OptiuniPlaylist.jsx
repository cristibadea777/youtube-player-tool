import { faCopy, faDownload, faSave, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { checkIfPlaylistExists, deletePlaylist, insertPlaylist, queryLibraryPlaylists } from "../../../DatabaseFunctions"

const OptiuniPlaylist = ({setViewOptiuniPlaylist, playlistName, inputLink, selectedLink, playlistVideos, libraryPlaylists, setLibraryPlaylists, setSelectedLink, setPlaylistVideos}) => {

    const handleCopyLink = () => {
        //cand se selecteaza un  playlist din biblioteca input link devine gol de asta e conditia
        if(inputLink !== '')
            navigator.clipboard.writeText(inputLink)
        else
            navigator.clipboard.writeText(selectedLink)
        handleClose()
    }

    const handleClose = () => {
        setViewOptiuniPlaylist(false)
    }

    const handleSaveToLibrary = async () => {
        const count = await checkIfPlaylistExists(inputLink)
        if(count >= 1){ 
            console.log("Playlist already present in Library")
            handleClose() 
            return 
        }
        await insertPlaylist(playlistName, inputLink, playlistVideos)
        const newLibraryPlaylists = await queryLibraryPlaylists()
        setLibraryPlaylists(newLibraryPlaylists)
        handleClose()
    }

    const handleRemoveFromLibrary = async () => {
        await deletePlaylist(selectedLink)
        setPlaylistVideos([])
        const newLibraryPlaylists = await queryLibraryPlaylists()
        setLibraryPlaylists(newLibraryPlaylists)
        handleClose()
    }

    const handleOnDownload = async () => {
        
    }

    return(
        <div style={{width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{width: "100%", height: "10%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label style={{fontSize: "0.9em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}>Playlist - {playlistName}</label>
            </div>
            <div style={{width: "80%", height: "60%", display: "flex", flexDirection: "column", padding: "5%"}}>
                <button onClick={handleCopyLink} className="butonOptiuni" >Copy link <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon></button>
                <button onClick={handleSaveToLibrary} className="butonOptiuni">Save to library <FontAwesomeIcon icon={faSave}></FontAwesomeIcon></button>
                <button onClick={handleRemoveFromLibrary} className="butonOptiuni">Remove from library <FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                <button onClick={handleOnDownload} className="butonOptiuni">Download <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></button>
                <button onClick={handleClose}style={{position: "absolute", bottom: 15, right: 25, fontSize: "0.8em", color: "white", whiteSpace: "wrap", overflow: "hidden", padding: "3%"}}>Close</button>
            </div>
        </div>
    )
}
export default OptiuniPlaylist