import { faScissors } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonCut = ({resizeWindow, viewCut, setViewCut, setViewSetari, setViewBiblioteca, setViewPlaylist, setViewDownload, setViewSearch}) => {

    const handleClickButonCut = () => {
        if(viewCut === false){
            resizeWindow(640)
            setViewPlaylist(false)
            setViewBiblioteca(false)
            setViewSetari(false)
            setViewDownload(false)
            setViewSearch(false)
        } 
        else resizeWindow(300)
        setViewCut(!viewCut)
    } 

    return (
        <button onClick={handleClickButonCut} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewCut ? "yellow" : "white"} icon={faScissors}></FontAwesomeIcon></button>
    )
}
export default ButonCut