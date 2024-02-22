import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonDownload = ({resizeWindow, viewDownload, setViewSetari, setViewPlaylist, setViewBiblioteca, setViewCut, setViewDownload, setViewSearch}) => {

    const handleClickButonDownload = () => {
        if(viewDownload === false){
            resizeWindow(640)
            setViewPlaylist(false)
            setViewBiblioteca(false)
            setViewCut(false)
            setViewSetari(false)
            setViewSearch(false)
        } 
        else resizeWindow(300)
        setViewDownload(!viewDownload)
    }

    return (
        <button onClick={handleClickButonDownload} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewDownload ? "yellow" : "white"} icon={faDownload}></FontAwesomeIcon></button>
    )

}
export default ButonDownload