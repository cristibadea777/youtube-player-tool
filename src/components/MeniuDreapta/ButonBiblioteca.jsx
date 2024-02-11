import { faBookBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonBiblioteca = ({resizeWindow, viewBiblioteca, viewPlaylist, setViewBiblioteca, setViewSetari}) => {

    const handleClickButonBiblioteca = () => {
        if(viewBiblioteca === false){
            if(viewPlaylist === false) resizeWindow(640)
            else resizeWindow(940)
            setViewSetari(false)
        } 
        else{
            if(viewPlaylist === false) resizeWindow(300)
            else resizeWindow(640)
        }
        setViewBiblioteca(!viewBiblioteca)
    }

    return (
        <button onClick={handleClickButonBiblioteca} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewBiblioteca ? "yellow" : "white"} icon={faBookBookmark}></FontAwesomeIcon></button>
    )
}
export default ButonBiblioteca