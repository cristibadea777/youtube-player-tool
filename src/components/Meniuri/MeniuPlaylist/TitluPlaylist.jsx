import { faArrowLeftLong, faArrowRightLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TitluPlaylist = ({viewOptiuniPlaylist, setViewOptiuniPlaylist, indexClipCurent, setIndexClipCurent, playlistVideos}) => {
    return(
        <div style={{width: "100%", height: "20vh", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "2%", borderBottom: "1px solid black"}}>
            <div style={{width: "80%"}}>
            <button className={indexClipCurent === 0 ? "buton-disabled" : ""} disabled={indexClipCurent === 0} onClick={() => {setIndexClipCurent(indexClipCurent - 1)}}><FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon></button>
                <button className={indexClipCurent === playlistVideos.length - 1 ? "buton-disabled" : ""} disabled={indexClipCurent === playlistVideos.length - 1} onClick={() => {setIndexClipCurent(indexClipCurent + 1)}}><FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon></button>
            </div>
            <div style={{width:"20%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <button onClick={() => {setViewOptiuniPlaylist(!viewOptiuniPlaylist)}}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
            </div>
        </div>
    )
}
export default TitluPlaylist