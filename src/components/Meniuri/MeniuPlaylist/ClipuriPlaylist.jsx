import { useEffect } from "react";
import { getVideoThumbnail } from "../../../PlaylistFunctions";

const ClipuriPlaylist = ({playlistVideos, indexClipCurent, setIndexClipCurent}) => {

    const handleClickVideo = (index) => { setIndexClipCurent(index) }

    useEffect(
        () => {
            const element = document.getElementById("videoDiv"+indexClipCurent);
            if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, [indexClipCurent]
    )

    return(
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", overflowY: "scroll", overflowX: "hidden"}}>
            {
            playlistVideos.map((video, index) => (
                <div id={"videoDiv"+index} className="divVideoPlaylist" key={index} style={{width: "100%", height: "140px", display: "flex", flexDirection: "row", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f", borderLeft: indexClipCurent === index ? "2px solid white" : "none"}}>
                    <div onClick={() => {handleClickVideo(index)}} style={{width: "100%", flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f"}}>
                        <div style={{height: "70px", width: "10%", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                            <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {index} </label>
                        </div>
                        <img style={{height: "70px", width: "30%"}} src={getVideoThumbnail(video["url_video"])} ></img>
                        <div style={{height: "70px", width: "60%", display: "flex", flexDirection: "row"}}>
                            <div style={{width: "80%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", padding: "0.5em"}}>
                                <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {video["nume_video"]} </label>
                            </div>
                        </div>
                    </div>
                    <div className="divButonOptiuniVideo" style={{flex: 1, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginRight: "2%"}}>
                        <button className="buttonOptiuniVideo">⋮</button>
                    </div>
                </div> 
            ))}
        </div>
    )
}
export default ClipuriPlaylist