import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonSearch = ({resizeWindow, viewSearch, setViewSetari, setViewPlaylist, setViewBiblioteca, setViewCut, setViewDownload, setViewSearch}) => {

    const handleClickButonSearch = () => {
        if(viewSearch === false){
            resizeWindow(640)
            setViewPlaylist(false)
            setViewBiblioteca(false)
            setViewCut(false)
            setViewSetari(false)
            setViewDownload(false)
        } 
        else resizeWindow(300)
        setViewSearch(!viewSearch)
    }

    return (
        <button onClick={handleClickButonSearch} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewSearch ? "yellow" : "white"} icon={faSearch}></FontAwesomeIcon></button>
    )

}
export default ButonSearch