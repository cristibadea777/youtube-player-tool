from pytube import Playlist
import sys

def get_playlist_info(playlist_url):
    try:
        playlist = Playlist(playlist_url)
        info_playlist = {
            "playlist_length" : len(playlist.video_urls),
            "playlist_name"   : playlist.title,
            "playlist_urls"   : playlist.video_urls
        }
        return info_playlist
    except:
        return "Private or invalid playlist"

if __name__ == "__main__":
    #url playlist dat ca argument in cmd
    playlist_url = sys.argv[1]
    info_playlist = get_playlist_info(playlist_url)
    #output in format json
    print(info_playlist)

#python -m PyInstaller --onefile playlist_urls.py