import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ButonUpload = ({setInputLink, setPlaylistVideos}) => {
    const handleLoad = async () => {
        try{
          let input = await navigator.clipboard.readText()
          setPlaylistVideos([])
          setInputLink(input)
        } catch { console.log("Error: " + error) }
    }
    return (
      <button className="butonMeniuDreapta" onClick={handleLoad}> <FontAwesomeIcon icon={faUpload}> </FontAwesomeIcon></button>
    )
}
export default ButonUpload