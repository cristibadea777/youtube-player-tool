const CurrentTime = ({currentTime}) => {
    return(
        <div style={{width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: "center", marginTop: "2%", marginBottom: "3%"}}>
            <label>
                Current time 
                - {String(Math.floor(currentTime / 3600)).padStart(2, '0')} 
                : 
                {String(Math.floor((currentTime % 3600) / 60)).padStart(2, '0')} 
                : 
                {String(Math.floor(currentTime % 60)).padStart(2, '0')}
            </label>    
        </div> 
    )
}
export default CurrentTime