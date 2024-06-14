import { useEffect } from "react";
import ReactPlayer from "react-player";

const PlayerCut = ({link, playerRef, playing, startTime, endTime, setPlaying, handleEnded, setCurrentTime, stareCut}) => {

    const seekToStartTime = () => {
        if(playerRef.current){
            playerRef.current.seekTo(startTime)
        }
    }
    
    useEffect(
        () => {
            seekToStartTime()
        }, [startTime, endTime]
    )

    return (
        <>
        {stareCut !== "" ? (
        <div style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center", display: "flex"}}>
            <p>{stareCut}</p>
        </div>
        ) : (
        <ReactPlayer
            ref={playerRef}
            url={link}
            playing={playing}
            width={"100%"} 
            height={"100%"}
            onEnded={handleEnded}       
            onPlay={()=>{setPlaying(true)}}
            onPause={()=>{setPlaying(false), seekToStartTime()}}
            onProgress={(progress) => {
                setCurrentTime(progress.playedSeconds)
                if (progress.playedSeconds >= endTime) {
                    seekToStartTime()
                }
            }}
        />
        )}
        </>
    )
}
export default PlayerCut