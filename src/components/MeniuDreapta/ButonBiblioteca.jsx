import { GrDatabase } from "react-icons/gr";

const ButonBiblioteca = ({resizeWindow, viewBiblioteca, viewPlaylist, setViewBiblioteca, setViewSetari, setViewCut, setViewDownload, setViewSearch}) => {

    const handleClickButonBiblioteca = () => {
        if(viewBiblioteca === false){
            if(viewPlaylist === false) resizeWindow(640)
            else resizeWindow(940)
            setViewSetari(false)
            setViewCut(false)
            setViewDownload(false)
            setViewSearch(false)
        } 
        else{
            if(viewPlaylist === false) resizeWindow(300)
            else resizeWindow(640)
        }
        setViewBiblioteca(!viewBiblioteca)
    }

    return (
        <button onClick={handleClickButonBiblioteca} className="butonMeniuDreapta"> <GrDatabase color={viewBiblioteca ? "yellow" : "white"} /> </button>
    )
}
export default ButonBiblioteca