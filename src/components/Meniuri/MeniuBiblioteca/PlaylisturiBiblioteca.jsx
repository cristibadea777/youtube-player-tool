import { useEffect, useState } from "react"
import { queryPlaylistThumbnail } from "../../../DatabaseFunctions"
import { getVideoThumbnail } from "../../../PlaylistFunctions"

const PlaylisturiBiblioteca = ({libraryPlaylists, setInputLink}) => {
    
    const [indexPlaylistCurent, setIndexPlaylistCurent] = useState(0)

    const [playlistThumbnails, setPlaylistThumbnails] = useState([])
    const getPlaylistThumbnail = async (playlistId) => {
        const url = await queryPlaylistThumbnail(playlistId)
        return getVideoThumbnail(url)
    }
    const loadPlaylistThumbnails = async () => {
        const thumbnails = await Promise.all(
            libraryPlaylists.map((playlist) => getPlaylistThumbnail(playlist["playlist_id"]))
        )
        setPlaylistThumbnails(thumbnails)
    }
    useEffect(
        () => {
            loadPlaylistThumbnails()
        }, [libraryPlaylists]
    )

    const handleClickPlaylist = (index, url) => {
        setIndexPlaylistCurent(index)
        setInputLink(url)
    }

    return(
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", overflowY: "scroll", overflowX: "hidden", backgroundColor: "#2f2f2f"}}>
            {libraryPlaylists.map((playlist, index) => (
                <div className="divVideoPlaylist" key={index} style={{width: "100%", height: "140px", display: "flex", flexDirection: "row", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f", borderLeft: indexPlaylistCurent === index ? "2px solid white" : "none"}}>
                    <div onClick={() => {handleClickPlaylist(index, playlist["url_playlist"])}} style={{width: "100%", flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f"}}>
                        <div style={{height: "70px", width: "10%", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                            <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {index} </label>
                        </div>
                        <img style={{height: "70px", width: "30%"}} src={playlistThumbnails[index]} ></img>
                        <div style={{height: "70px", width: "60%", display: "flex", flexDirection: "row"}}>
                            <div style={{width: "80%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", padding: "0.5em"}}>
                                <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {playlist["nume_playlist"]} </label>
                            </div>
                        </div>
                    </div>
                    <div className="divButonOptiuniVideo" style={{flex: 1, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginRight: "2%"}}>
                        <button className="buttonOptiuniVideo">⋮</button>
                    </div>
                </div> 
                )
            )}
        </div>
    )
}
export default PlaylisturiBiblioteca