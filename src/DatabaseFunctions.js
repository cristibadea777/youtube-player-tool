import Database from "tauri-plugin-sql-api"

const db = await Database.load("sqlite:test.db")

const emptyDatabase = async () => {
    await db.execute("DROP TABLE Video")
    await db.execute("DROP TABLE Playlist")
} 

const createDatabase = async () => {
    await db.execute("CREATE TABLE IF NOT EXISTS Playlist(nume_playlist TEXT, url_playlist TEXT, playlist_id INTEGER PRIMARY KEY)")
    await db.execute("CREATE TABLE IF NOT EXISTS Video(nume_video TEXT, url_video TEXT, playlist_id INTEGER, FOREIGN KEY(playlist_id) REFERENCES Playlist(playlist_id))")
}

const checkIfPlaylistExists = async (inputLink) => {
    const count = await db.select("SELECT COUNT(*) FROM Playlist WHERE url_playlist = $1", [inputLink])
    console.log(count)
    return count[0]["COUNT(*)"]
}

const insertPlaylist = async (playlistName, inputLink, playlistVideos) => {
    const playlistInsertQuery  = "INSERT INTO Playlist(nume_playlist, url_playlist) VALUES ($1, $2)"
    const playlistInsertValues = [playlistName, inputLink]
    const {lastInsertId: playlistId} = await db.execute(playlistInsertQuery, playlistInsertValues)

    const videoInsertQuery  = "INSERT INTO Video(nume_video, url_video, playlist_id) VALUES ($1, $2, $3)"
    for(const video of playlistVideos){
      const videoInsertValues = [video["video_title"], video["video_url"], playlistId]
      await db.execute(videoInsertQuery, videoInsertValues) 
    }
}

const queryLibraryPlaylists = async () => {
    const dataTabelPlaylist = await db.select("SELECT * FROM Playlist")
    return dataTabelPlaylist
}

const queryPlaylistVideos = async (playlistId) => {
    const videos = await db.select("SELECT * FROM Video WHERE playlist_id = $1", [playlistId])
    ////////////////////////////////////////////
}

const queryPlaylistThumbnail = async (playlistId) => {
    const thumbnail = await db.select("SELECT url_video FROM Video WHERE playlist_id = $1 LIMIT 1", [playlistId])
    return thumbnail[0]["url_video"]
}

export { checkIfPlaylistExists, createDatabase, emptyDatabase, insertPlaylist, queryLibraryPlaylists, queryPlaylistThumbnail, queryPlaylistVideos }

