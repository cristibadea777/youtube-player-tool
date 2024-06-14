from pytube import YouTube
import os
import subprocess
import sys


def download_part_of_video(video_url, start_time, end_time, output_path):
    try:
        yt = YouTube(video_url)
        video_title = yt.title

        video_stream = yt.streams.filter(file_extension='mp4').first()
        video_stream.download(output_path)

        start_seconds = int(start_time)
        end_seconds = int(end_time)

        input_path = f"{output_path}/{video_title}.mp4"
        output_file = f"{output_path}/{video_title}_{start_time}-{end_time}.mp4"

        print(f"{video_title.encode("utf-8")}")

        if not os.path.exists(output_file):
            ffmpeg_command = [
                "ffmpeg",
                "-i", input_path,
                "-ss", str(start_seconds),
                "-to", str(end_seconds),
                "-c", "copy",
                output_file
            ]
            subprocess.run(ffmpeg_command, capture_output=True, text=True, check=True)
            print(f"Downloaded part of the video to {output_file.encode("utf-8")}")
        else:
            print(f"Download file {output_file.encode("utf-8")} already exists, skipping")

        os.remove(input_path)

        os.startfile(output_file)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    #https://youtu.be/fC1HF29n9UA DVRST Endless Love - 120 140 
    video_url = sys.argv[1] 
    start_time = sys.argv[2]  
    end_time = sys.argv[3]
    output_path = sys.argv[4]   
    download_part_of_video(video_url, start_time, end_time, output_path)

    #python video_cut.py "https://www.youtube.com/watch?v=bSq8Wq8NRNU" "1600" "1620" "C:/Users/Cristi/Downloads/" 26:40 27:00
    #python video_cut.py "https://www.youtube.com/watch?v=IH00sX0XuX4" "0" "5" "C:/Users/Cristi/Downloads/"
    #python video_cut.py "https://www.youtube.com/watch?v=N4bHAdMeSys" "0" "5" "C:/Users/Cristi/Downloads/"