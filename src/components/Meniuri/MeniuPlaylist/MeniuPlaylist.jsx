import { useState } from "react";
import ClipuriPlaylist from "./ClipuriPlaylist";
import OptiuniPlaylist from "./OptiuniPlaylist";
import TitluPlaylist from "./TitluPlaylist";

const MeniuPlaylist = ({playlistVideos, labelPlaylist, indexClipCurent, setIndexClipCurent, playlistName, inputLink, libraryPlaylists, setLibraryPlaylists, selectedLink, setSelectedLink, setPlaylistVideos}) => {

    const [viewOptiuniPlaylist, setViewOptiuniPlaylist] = useState(false)
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "340px", height: "99%", borderLeft: "1px solid #2f2f2f", alignItems: "center", justifyContent: "center"}}>
            {  (playlistVideos.length === 0) ? (
                <label>{labelPlaylist}</label>
            ) : (
                <>
                {
                !viewOptiuniPlaylist ? (
                    <>
                    <TitluPlaylist 
                        viewOptiuniPlaylist    = {viewOptiuniPlaylist}
                        playlistVideos         = {playlistVideos}
                        indexClipCurent        = {indexClipCurent}
                        setViewOptiuniPlaylist = {setViewOptiuniPlaylist}
                        setIndexClipCurent     = {setIndexClipCurent}
                    />
                    <ClipuriPlaylist 
                        playlistVideos      = {playlistVideos}
                        indexClipCurent     = {indexClipCurent}
                        setIndexClipCurent  = {setIndexClipCurent}
                    />
                    </>
                ) : (
                    <>
                    <OptiuniPlaylist 
                        setViewOptiuniPlaylist = {setViewOptiuniPlaylist}
                        playlistName           = {playlistName}
                        inputLink              = {inputLink}
                        selectedLink           = {selectedLink}
                        playlistVideos         = {playlistVideos}
                        libraryPlaylists       = {libraryPlaylists}
                        setLibraryPlaylists    = {setLibraryPlaylists}
                        setSelectedLink        = {setSelectedLink}
                        setPlaylistVideos      = {setPlaylistVideos}
                    />
                    </>
                )
                }
                </>
            )}
        </div>
    )

}
export default MeniuPlaylist