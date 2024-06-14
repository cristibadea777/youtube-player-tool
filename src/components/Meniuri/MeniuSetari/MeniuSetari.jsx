const MeniuSetari = ({}) => {


    const handleChangeSettings = async () => {

    }
    
    return (
        <div style={{display: "flex", width: "340px", height: "99%",   borderLeft: "1px solid #2f2f2f", justifyContent: "flex-start", flexDirection: "column"}}>
            
            <div style={{width: "100%", display: "flex", justifyContent: "center" , marginTop: "3%", marginBottom: "3%"}}>
                <label>Settings</label>
            </div> 

            <div style={{display: "flex", flexDirection:"column", flex: 1, width: "100%", alignItems: "center", justifyContent: "center"}}>
                <label>Nothing to change yet</label>
                <button onClick={handleChangeSettings} style={{width: "30%"}}>Change</button>
            </div>
            
        </div>
    )
}
export default MeniuSetari