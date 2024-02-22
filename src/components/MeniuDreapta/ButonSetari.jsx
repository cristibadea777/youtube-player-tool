import { faCogs } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonSetari = ({resizeWindow, viewSetari, setViewSetari, setViewPlaylist, setViewBiblioteca, setViewCut, setViewDownload, setViewSearch}) => {

    const handleClickButonSetari = () => {
        if(viewSetari === false){
            resizeWindow(640)
            setViewPlaylist(false)
            setViewBiblioteca(false)
            setViewCut(false)
            setViewDownload(false)
            setViewSearch(false)
        } 
        else resizeWindow(300)
        setViewSetari(!viewSetari)
    }

    return (
        <button onClick={handleClickButonSetari} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewSetari ? "yellow" : "white"} icon={faCogs}></FontAwesomeIcon></button>
    )

}
export default ButonSetari