import { Command } from '@tauri-apps/api/shell';

//preluare url-uri din playlist cu programul sidecar facut in python
const loadPlaylist = async (link, setPlaylistVideos, setPlaylistName, setPlaylistLength, setLabelPlaylist) => {
    try {
      setLabelPlaylist("Loading...")
      const command = Command.sidecar('../bin/playlist_videos', [link])
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

const loadPlaylistFromDatabase = (playlist, setPlaylistVideos, setPlaylistName, setPlaylistLength, setLabelPlaylist) => {
  setLabelPlaylist("Loading...")
  setPlaylistName(playlist["nume_playlist"])
  setPlaylistLength(playlist["length_playlist"])
  setPlaylistVideos(playlist["playlist_videos"])
  setLabelPlaylist("Select a playlist first")
}

const extractVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  const videoId = match && match[1] ? match[1] : null;
  return videoId
}

const getVideoThumbnail = (url) => {
  return "https://i3.ytimg.com/vi/" + extractVideoId(url) + "/hqdefault.jpg"
}

export { getVideoThumbnail, loadPlaylist, loadPlaylistFromDatabase };
