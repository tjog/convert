import { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "../components/ui/button";


function TranscodeAviToMp4Example({ ffmpegRef }: { ffmpegRef: React.MutableRefObject<FFmpeg> }) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
    });

    const transcode = async () => {
        const videoURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile("input.avi", await fetchFile(videoURL));
        await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
        const fileData = await ffmpeg.readFile('output.mp4');
        const data = new Uint8Array(fileData as ArrayBuffer);
        if (videoRef.current) {
            videoRef.current.src = URL.createObjectURL(
                new Blob([data.buffer], { type: 'video/mp4' })
            )
        }
    };

    return (
        <>
            <video ref={videoRef} controls></video>
            <br />
            <Button onClick={transcode}>Transcode avi to mp4</Button>
            <p ref={messageRef}></p>
        </>
    )
}

export default TranscodeAviToMp4Example