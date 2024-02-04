import { useEffect } from "react";

const MeniuPlaylist = ({playlistVideos, labelPlaylist, indexClipCurent, setIndexClipCurent}) => {
    
    //daca e si meniu librarie, sa fie 30% sau ceva nu flex

    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^&]+)/);
        const videoId = match && match[1] ? match[1] : null;
        return videoId
    }

    const getVideoThumbnail = (url) => {
        return "https://i3.ytimg.com/vi/" + extractVideoId(url) + "/hqdefault.jpg"
    }

    const handleClickVideo = (index) => {
        setIndexClipCurent(index)
    }

    useEffect(
        () => {
            const element = document.getElementById("videoDiv"+indexClipCurent);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        }, [indexClipCurent]
    )

    return (
        <div style={{display: "flex", width: "340px", height: "99%", borderLeft: "1px solid #2f2f2f", alignItems: "center", justifyContent: "center"}}>
            {  (playlistVideos.length === 0) ? (
                <label>{labelPlaylist}</label>
            ) : (
                <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", overflowY: "scroll", overflowX: "hidden"}}>
                    {
                    playlistVideos.map((video, index) => (
                        <div id={"videoDiv"+index} className="divVideoPlaylist" key={index} style={{width: "100%", height: "140px", display: "flex", flexDirection: "row", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f", borderLeft: indexClipCurent === index ? "1px solid white" : "none"}}>
                            <div onClick={() => {handleClickVideo(index)}} style={{width: "100%", flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#2f2f2f"}}>
                                <div style={{height: "70px", width: "10%", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                                    <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {index} </label>
                                </div>
                                <img style={{height: "70px", width: "30%"}} src={getVideoThumbnail(video["video_url"])} ></img>
                                <div style={{height: "70px", width: "60%", display: "flex", flexDirection: "row"}}>
                                    <div style={{width: "80%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", padding: "0.5em"}}>
                                        <label style={{fontSize: "0.6em", color: "white", whiteSpace: "wrap", overflow: "hidden"}}> {video["video_title"]} </label>
                                    </div>
                                </div>
                            </div>
                            <div className="divButonOptiuniVideo" style={{flex: 1, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <button className="buttonOptiuniVideo">⋮</button>
                            </div>
                        </div> 
                    ))}
                </div>
            )}
        </div>
    )

}
export default MeniuPlaylist