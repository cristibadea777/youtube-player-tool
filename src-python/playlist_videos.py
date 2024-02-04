from pytube import Playlist, YouTube
import sys
import json
#import time
import concurrent.futures

#1500 clipuri in playlist => ruleaza in ~20 secunde 

def get_video_info(video_url):
    try:
        video = YouTube(video_url)
        info_video = {
            "video_title"  :  video.title,
            "video_url"    :  video_url
        }
        return info_video
    except Exception as e: 
        print(f"Error fetching video info for {video_url}: {e}")
        return {"error" :  f"Error fetching video info for {video_url}"}

def get_playlist_info(playlist_url):
    try:
        playlist = Playlist(playlist_url)
        #mai mult de 20 workeri nu are alt impact
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor: 
            video_info_list = list(executor.map(get_video_info, playlist.video_urls))
        info_playlist = {
            "playlist_length"   :  len(video_info_list),
            "playlist_name"     :  playlist.title,
            "playlist_videos"   :  video_info_list
        }
        return json.dumps(info_playlist, indent=3)
    except Exception as e:
        print(e)
        return json.dumps({"error" : "Private or invalid playlist"})

if __name__ == "__main__":
    #url playlist dat ca argument in cmd
    playlist_url = sys.argv[1]
    #start_time = time.time()
    info_playlist = get_playlist_info(playlist_url)
    #output in format json
    print(info_playlist)
    #print("--- %s seconds ---" % (time.time() - start_time))

#python -m PyInstaller --onefile playlist_videos.py