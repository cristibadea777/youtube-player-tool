import PlaylisturiBiblioteca from "./PlaylisturiBiblioteca"

const MeniuBiblioteca = ({libraryPlaylists, setInputLink}) => {
    return(
        <div style={{display: "flex", flexDirection: "column", width: "340px", height: "99%", borderLeft: "1px solid  black", alignItems: "center", justifyContent: "center"}}>
            <PlaylisturiBiblioteca 
                libraryPlaylists = {libraryPlaylists}
                setInputLink     = {setInputLink}
            />
        </div>
    )
}
export default MeniuBiblioteca