from pytube import YouTube
import os
import subprocess

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

        ffmpeg_command = [
            "ffmpeg",
            "-i", input_path,
            "-ss", str(start_seconds),
            "-to", str(end_seconds),
            "-c", "copy",
            output_file
        ]

        subprocess.run(ffmpeg_command, capture_output=True, text=True, check=True)

        print(f"{video_title}")

        os.remove(input_path)

        os.startfile(output_file)

        print(f"Downloaded part of the video to {output_file}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    video_url = "https://youtu.be/fC1HF29n9UA"
    start_time = 120  
    end_time = 140   
    output_path = "C:/Users/Cristi/Downloads"
    download_part_of_video(video_url, start_time, end_time, output_path)