const MeniuDownload = ({}) => {

    const handleDownload = () => {

    }

    return (
        <div style={{display: "flex", width: "340px", height: "99%",   borderLeft: "1px solid #2f2f2f", justifyContent: "flex-start", flexDirection: "column"}}>
                
            <div style={{width: "100%", display: "flex", justifyContent: "center" , marginTop: "3%", marginBottom: "3%", flexDirection: "column"}}>
                <label>Now downloading video/playlist-nume playlist</label>
                <label>Current video - nume <video src=""></video></label>
            </div> 

            <div style={{display: "flex", flexDirection:"column", flex: 1, width: "100%", alignItems: "center", justifyContent: "center"}}>
                <button onClick={handleDownload} style={{width: "50%"}}>Download</button>
            </div>
        </div>
    )

}
export default MeniuDownload