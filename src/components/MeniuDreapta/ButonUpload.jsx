import { FaUpload } from "react-icons/fa";

const ButonUpload = ({inputLink, setInputLink, setSelectedLink, setPlaylistVideos}) => {
    const handleLoad = async () => {
        try{
          let input = await navigator.clipboard.readText()
          //daca linku de input actual e ca cel dat ca input - return
          if(input === inputLink) return 
          setSelectedLink('')
          setPlaylistVideos([])
          setInputLink(input)
        } catch (error) { console.log("Error: " + error) }
    }
    return (
      <button className="butonMeniuDreapta" onClick={handleLoad}> <FaUpload/> </button>
    )
}
export default ButonUpload