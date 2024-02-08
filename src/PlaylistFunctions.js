import { Command } from '@tauri-apps/api/shell';

//preluare url-uri din playlist cu programul sidecar facut in python
const loadPlaylist = async (inputLink, setPlaylistVideos, setPlaylistName, setPlaylistLength, setLabelPlaylist) => {
    try {
      setLabelPlaylist("Loading...")

      const command = Command.sidecar('../bin/playlist_videos', [inputLink])
      const output = await command.execute()
      const outputString = output.stdout    
      
      const playlist = JSON.parse(outputString)
      
      setPlaylistLength(playlist["playlist_length"])
      setPlaylistName(playlist["playlist_name"])
      setPlaylistVideos(playlist["playlist_videos"])

      setLabelPlaylist("Select a playlist first")

    } catch (error) { 
        console.log(error)
        setLabelPlaylist("Error")
    }
}

const extractVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  const videoId = match && match[1] ? match[1] : null;
  return videoId
}

const getVideoThumbnail = (url) => {
  return "https://i3.ytimg.com/vi/" + extractVideoId(url) + "/hqdefault.jpg"
}

export { getVideoThumbnail, loadPlaylist };

