import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//daca s-a uploadat un playlist {links prezent sau view librarie} se afiseaza butonu. care e toggle pt meniu de playlist curent

const ButonPlaylist = ({resizeWindow, viewPlaylist, setViewSetari, setViewPlaylist}) => {

    const handleClickButonPlaylist = () => {
        if(viewPlaylist === false){
            resizeWindow(640)
            setViewSetari(false)
        } 
        else resizeWindow(300)
        setViewPlaylist(!viewPlaylist)
    }

    return (
        <button onClick={handleClickButonPlaylist} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewPlaylist ? "yellow" : "white"} icon={faPhotoVideo}> </FontAwesomeIcon> </button>
    )

}
export default ButonPlaylist