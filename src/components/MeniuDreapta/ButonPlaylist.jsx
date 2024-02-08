import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//daca s-a uploadat un playlist {links prezent sau view librarie} se afiseaza butonu. care e toggle pt meniu de playlist curent

const ButonPlaylist = ({resizeWindow, viewPlaylist, setViewSetari, viewBiblioteca, setViewPlaylist}) => {

    const handleClickButonPlaylist = () => {
        if(viewPlaylist === false){
            if(viewBiblioteca === false) resizeWindow(640)
            else resizeWindow(940)
            setViewSetari(false)
        } 
        else{
            if(viewBiblioteca === false) resizeWindow(300)
            else resizeWindow(640)
        }
        setViewPlaylist(!viewPlaylist)
    }

    return (
        <button onClick={handleClickButonPlaylist} className="butonMeniuDreapta"> <FontAwesomeIcon color={viewPlaylist ? "yellow" : "white"} icon={faPhotoVideo}> </FontAwesomeIcon> </button>
    )

}
export default ButonPlaylist