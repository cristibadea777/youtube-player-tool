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

const checkIfPlaylistExists = async (link) => {
    const count = await db.select("SELECT COUNT(*) FROM Playlist WHERE url_playlist = $1", [link])
    console.log(count)
    return count[0]["COUNT(*)"]
}

const insertPlaylist = async (playlistName, link, playlistVideos) => {
    const playlistInsertQuery  = "INSERT INTO Playlist(nume_playlist, url_playlist) VALUES ($1, $2)"
    const playlistInsertValues = [playlistName, link]
    const {lastInsertId: playlistId} = await db.execute(playlistInsertQuery, playlistInsertValues)

    const videoInsertQuery  = "INSERT INTO Video(nume_video, url_video, playlist_id) VALUES ($1, $2, $3)"
    for(const video of playlistVideos){
      const videoInsertValues = [video["nume_video"], video["url_video"], playlistId]
      await db.execute(videoInsertQuery, videoInsertValues) 
    }
}

const queryLibraryPlaylists = async () => {
    const dataTabelPlaylist = await db.select("SELECT * FROM Playlist")
    return dataTabelPlaylist
}

const queryPlaylist = async (playlistLink) => {
    const db_playlist = await db.select("SELECT * FROM Playlist WHERE url_playlist = $1", [playlistLink])
    const playlistVideos = await db.select("SELECT * FROM Video WHERE playlist_id = $1", [db_playlist[0]["playlist_id"]])
    const playlist = {
        "nume_playlist"     :   db_playlist[0]["nume_playlist"],
        "length_playlist"   :   playlistVideos.length,
        "playlist_id"       :   db_playlist[0]["playlist_id"],
        "url_playlist"      :   db_playlist[0]["url_playlist"],
        "playlist_videos"   :   playlistVideos,
    }
    return playlist
}

const queryPlaylistThumbnail = async (playlistId) => {
    const thumbnail = await db.select("SELECT url_video FROM Video WHERE playlist_id = $1 LIMIT 1", [playlistId])
    return thumbnail[0]["url_video"]
}

export { checkIfPlaylistExists, createDatabase, emptyDatabase, insertPlaylist, queryLibraryPlaylists, queryPlaylist, queryPlaylistThumbnail }

