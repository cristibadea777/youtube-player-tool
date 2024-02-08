import { faPause, faPlay, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import ReactPlayer from "react-player"

const VideoPlayer = ({link, playlistVideos, indexClipCurent, setIndexClipCurent, setLink}) => {

    const [playing,   setPlaying]   = useState(false)
    const [muted,     setMuted]     = useState(false)
    const playerRef                 = useRef()

    //daca avem linkuri in playlist atunci trece la urmatorul indexClipCurent, daca nu suntem la ultimul clip.
    //daca suntem la ultimul clip sau este doar un singur video, se deruleaza inapoi
    const handleEnded = () => {
        if(playlistVideos.length > 0 && indexClipCurent !== playlistVideos.length - 1){
            setLink(playlistVideos[indexClipCurent+1]["video_url"])
            setIndexClipCurent(indexClipCurent+1)
        } else { playerRef.current.seekTo(0, 'seconds') }
    }

    return (
        <>
        {link && (
        <div style={{height: "100%  ", width: "100%", backgroundColor: "#1F1F1F"}}>
            
            <div style={{width: "100%", height: "80%"}}>
                <ReactPlayer
                    ref={playerRef}
                    url={link}
                    playing={playing}
                    width={"100%"} 
                    height={"100%"}
                    onEnded={handleEnded}       
                    muted={muted}
                    onPlay={()=>{setPlaying(true)}}
                    onPause={()=>{setPlaying(false)}}
                    //daca s-a sfarsit clipul se pune pauza - daca este un singur clip sau ultimul clip din playlist
                    onProgress={(progress) => {
                        if ( (progress.playedSeconds >= progress.loadedSeconds - 1) && (playlistVideos.length === 0 || indexClipCurent === playlistVideos.length - 1)) {
                            setPlaying(false);
                        }
                    }}
                />
            </div>

            <div style={{width: "100%", height: "20%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#201c1c"}}>
                <button onClick={() => {setPlaying(!playing)} }> 
                    {!playing ? ( <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> ) : ( <FontAwesomeIcon icon={faPause}></FontAwesomeIcon> )} 
                </button>
                <button onClick={() => {setMuted(!muted)} }> 
                {!muted ? ( <FontAwesomeIcon icon={faVolumeMute}></FontAwesomeIcon> ) : ( <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon> )}
                </button>
            </div>

        </div>
        )} 
        </>
    )
}
export default VideoPlayer