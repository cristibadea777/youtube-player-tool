import { faCogs } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonSetari = ({resizeWindow, viewSetari, setViewSetari, setViewPlaylist}) => {

    const handleClickButonSetari = () => {
        if(viewSetari === false){
            resizeWindow(640)
            setViewPlaylist(false)
        } 
        else resizeWindow(300)
        setViewSetari(!viewSetari)
    }

    return (
        <button style={viewSetari ? {border: "1px solid white"} : {}} onClick={handleClickButonSetari} className="butonMeniuDreapta"> <FontAwesomeIcon icon={faCogs}></FontAwesomeIcon></button>
    )

}
export default ButonSetari