import Database from "tauri-plugin-sql-api"

const db = await Database.load("sqlite:test.db")

const emptyDatabase = async () => {
    await db.execute("DROP TABLE Video")
    await db.execute("DROP TABLE Playlist")
    //await db.execute("DROP TABLE Settings")
} 

//const checkSetariGoale = async () => {
//    const result = await db.select("SELECT COUNT(*) AS count FROM Settings")
//    return result[0].count === 0
//}

const createDatabase = async () => {
    await db.execute("CREATE TABLE IF NOT EXISTS Playlist(nume_playlist TEXT, url_playlist TEXT, playlist_id INTEGER PRIMARY KEY)")
    await db.execute("CREATE TABLE IF NOT EXISTS Video(nume_video TEXT, url_video TEXT, playlist_id INTEGER, FOREIGN KEY(playlist_id) REFERENCES Playlist(playlist_id))")
    //await db.execute("CREATE TABLE IF NOT EXISTS Settings(download_path TEXT, settings_id INTEGER PRIMARY KEY)")
    //const setariGoale = await checkSetariGoale()
    //if(setariGoale){
    //    const downloadPathInsertQuery  = "INSERT INTO Settings(download_path, settings_id) VALUES ($1, $2)"
    //    const downloadPathInsertValues = ["set download path", 1]
    //    await db.execute(downloadPathInsertQuery, downloadPathInsertValues) 
    //}
}

const checkIfPlaylistExists = async (link) => {
    const count = await db.select("SELECT COUNT(*) FROM Playlist WHERE url_playlist = $1", [link])
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
    let playlist = {}
    const db_playlist = await db.select("SELECT * FROM Playlist WHERE url_playlist = $1", [playlistLink])
    const playlistVideos = await db.select("SELECT * FROM Video WHERE playlist_id = $1", [db_playlist[0]["playlist_id"]])
    playlist = {
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

const deletePlaylist = async (playlistLink) => {
    const playlistId = await db.select("SELECT playlist_id FROM Playlist WHERE url_playlist = $1", [playlistLink]) 

    await db.execute("DELETE FROM Video WHERE playlist_id = $1", [playlistId[0]["playlist_id"]])
    await db.execute("DELETE FROM Playlist WHERE url_playlist = $1", [playlistLink])
}


export { checkIfPlaylistExists, createDatabase, deletePlaylist, emptyDatabase, insertPlaylist, queryLibraryPlaylists, queryPlaylist, queryPlaylistThumbnail }

