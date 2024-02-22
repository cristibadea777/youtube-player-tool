import { FaUpload } from "react-icons/fa";

const ButonUpload = ({setInputLink, setSelectedLink, setPlaylistVideos}) => {
    const handleLoad = async () => {
        try{
          setSelectedLink('')
          let input = await navigator.clipboard.readText()
          setPlaylistVideos([])
          setInputLink(input)
        } catch { console.log("Error: " + error) }
    }
    return (
      <button className="butonMeniuDreapta" onClick={handleLoad}> <FaUpload/> </button>
    )
}
export default ButonUpload