import { Command } from "@tauri-apps/api/shell"
import { useRef, useState } from "react"
import CurrentTime from "./CurrentTime"
import InputTime from "./InputTime"
import PlayerCut from "./PlayerCut"

const MeniuCut = ({link, title, downloadPath}) => {

    const [playing, setPlaying] = useState(false)
    const playerRef             = useRef()

    const handleEnded = () => {}

    const [hourStart,   setHourStart]   = useState('00')
    const [minuteStart, setMinuteStart] = useState('00')
    const [secondStart, setSecondStart] = useState('00')
    
    const [hourEnd,   setHourEnd]   = useState('00')
    const [minuteEnd, setMinuteEnd] = useState('00')
    const [secondEnd, setSecondEnd] = useState('00')

    const [stareCut, setStareCut] = useState("")

    const [currentTime, setCurrentTime] = useState(0)

    const handleInputTime = (event, functieSet) => {
        let value = event.target.value
        if(value <= 59 && value >= 0 && value.length !== 3)
            functieSet(value)
        else 
            functieSet('00')
    }

    const [startTime, setStartTime] = useState(0)
    const [endTime,   setEndTime]   = useState(0)

    const toSeconds = (hours, minutes, seconds) => {
        return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 +  parseInt(seconds, 10)
    }
    
    const handlePreview = () => {
        setStareCut("")
        setPlaying(!playing)
        let start = toSeconds(hourStart, minuteStart, secondStart)
        let end   = toSeconds(hourEnd, minuteEnd, secondEnd) 
        if(end > 0 && start >= 0 && end > start){
            setStartTime(start)
            setEndTime(end)
        }
    }

    const handleCut = async () => {
        let start = toSeconds(hourStart, minuteStart, secondStart)
        let end   = toSeconds(hourEnd, minuteEnd, secondEnd) 
        if(!(end > 0 && start >= 0 && end > start)){
            setStareCut("Error: start time is bigger than end time")
            return
        }
        setStareCut("Cutting and downloading...")
        //apelare sidecar 
        try {
            const command = Command.sidecar('../bin/video_cut', [link, start.toString(), end.toString(), downloadPath])
            const output = await command.execute()
            console.log(startTime)
            console.log(endTime)
            const outputString = output.stdout     
            console.log(outputString)     
            setStareCut("Downloaded to: " + downloadPath)
        } catch (error) { 
            console.log(error)
            setStareCut("Error: " + error)
        }
    }
    
    return (
        <div style={{display: "flex", width: "340px", height: "99%", alignItems: "center",  borderLeft: "1px solid #2f2f2f", justifyContent: "flex-start", flexDirection: "column"}}>
            
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "3%", marginBottom: "3%"}}>
                <label>Cutting video - {title}</label>
            </div> 
            
            <div style={{width: "70%", height: "50%"}}>
                <PlayerCut 
                    link            = {link}
                    playing         = {playing}
                    startTime       = {startTime}
                    endTime         = {endTime}
                    playerRef       = {playerRef}
                    setPlaying      = {setPlaying}
                    handleEnded     = {handleEnded}
                    setCurrentTime  = {setCurrentTime}
                    stareCut        = {stareCut}
                />
            </div>

            <CurrentTime 
                currentTime = {currentTime}
            />

            <InputTime 
                handleInputTime={handleInputTime}
                hourStart   = {hourStart}    setHourStart   = {setHourStart}
                minuteStart = {minuteStart}  setMinuteStart = {setMinuteStart}
                secondStart = {secondStart}  setSecondStart = {setSecondStart}
                hourEnd     = {hourEnd}      setHourEnd     = {setHourEnd}
                minuteEnd   = {minuteEnd}    setMinuteEnd   = {setMinuteEnd}
                secondEnd   = {secondEnd}    setSecondEnd   = {setSecondEnd}
            />

            <div style={{display: "flex", flex: 1, width: "100%", alignItems: "center", justifyContent: "space-between"}}>
                <button onClick={handlePreview} style={{width: "30%"}}>{!playing ? "Preview" : "Stop"}</button>
                <button onClick={handleCut} style={{width: "30%"}}>Cut</button>
            </div>
        </div>
    )
}
export default MeniuCut