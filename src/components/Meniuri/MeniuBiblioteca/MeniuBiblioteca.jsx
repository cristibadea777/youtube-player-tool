import PlaylisturiBiblioteca from "./PlaylisturiBiblioteca"

const MeniuBiblioteca = ({libraryPlaylists, setSelectedLink, selectedLink,  setInputLink, setPlaylistVideos}) => {
    return(
        <div style={{display: "flex", flexDirection: "column", width: "340px", height: "99%", borderLeft: "1px solid  black", alignItems: "center", justifyContent: "center"}}>
            <PlaylisturiBiblioteca 
                selectedLink        = {selectedLink}
                libraryPlaylists    = {libraryPlaylists}
                setSelectedLink     = {setSelectedLink}
                setInputLink        = {setInputLink}
                setPlaylistVideos   = {setPlaylistVideos}
            />
        </div>
    )
}
export default MeniuBiblioteca