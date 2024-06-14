const InputTime = ({hourStart, minuteStart, secondStart, hourEnd, minuteEnd, secondEnd, handleInputTime, setHourStart, setMinuteStart, setSecondStart, setHourEnd, setMinuteEnd, setSecondEnd}) => {
    return(
        <div style={{width: "100%", height: "5%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "2%"}}>
            <div style={{width: "50%", display: "flex", flexDirection: "row"}}>
                <div style={{width: "40%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                    <label>Start</label> 
                </div>
                <div style={{width: "60%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}> 
                    <input value={hourStart} onChange={(event) => {handleInputTime(event, setHourStart)}} className="input-timp"></input>
                    <label>:</label>
                    <input value={minuteStart} onChange={(event) => {handleInputTime(event, setMinuteStart)}} className="input-timp"></input>
                    <label>:</label>
                    <input value={secondStart} onChange={(event) => {handleInputTime(event, setSecondStart)}} className="input-timp"></input>
                </div>
            </div>
            <div style={{width: "50%", display: "flex", flexDirection: "row"}}>
                <div style={{width: "40%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                    <label>End</label> 
                </div>
                <div style={{width: "60%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}> 
                    <input value={hourEnd} onChange={(event) => {handleInputTime(event, setHourEnd)}} className="input-timp"></input>
                    <label>:</label>
                    <input value={minuteEnd} onChange={(event) => {handleInputTime(event, setMinuteEnd)}} className="input-timp"></input>
                    <label>:</label>
                    <input value={secondEnd} onChange={(event) => {handleInputTime(event, setSecondEnd)}} className="input-timp"></input>
                </div>
            </div>
        </div> 
    )
}
export default InputTime