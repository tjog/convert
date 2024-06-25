import { useRef, useState } from "react";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "../components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toMinutesAndSeconds } from "@/lib/utils";
import { useFfmpeg } from "@/components/ffmpeg-provider";


function TranscodeAviToMp4Example() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const [progress, setProgress] = useState<number | null>(null)
    const [executionTime, setExecutionTime] = useState<number | null>(null)
    const { ffmpeg, loaded } = useFfmpeg();

    if (!loaded) {
        return <p>Loading...</p>
    }

    ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // The progress events are accurate only when the length of input and output video/audio file are the same.
    ffmpeg.on("progress", ({ progress, time }) => {
        setProgress(progress);
        setExecutionTime(time);
    });

    const transcode = async () => {
        const videoURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
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

    const { minutes, seconds } = executionTime ?
        toMinutesAndSeconds(executionTime / 1000000) /* divide by AV_TIME_BASE , FFMPEG internal time base*/
        : { minutes: 0, seconds: 0 };

    return (
        <>
            <video ref={videoRef} controls></video>
            <br />
            <Button onClick={transcode}>Transcode avi to mp4</Button>
            {progress && <Progress value={progress * 100}></Progress>}
            {executionTime && <p>Currently at {minutes}min {seconds.toFixed(2)}sec in media</p>}
            <p ref={messageRef}></p>
        </>
    )
}

export default TranscodeAviToMp4Example