import { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "../components/ui/button";


function ResizeExample({ ffmpegRef }: { ffmpegRef: React.MutableRefObject<FFmpeg> }) {
    const imageRef = useRef<HTMLImageElement | null>(null)
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
    });

    const resize = async () => {
        const imageURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/c81125391a0ada7599edc6bff2da51c1a3ed38d0/image.jpg";
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile("1.jpg", await fetchFile(imageURL));
        const args = ["-i", "1.jpg", "-vf", "scale=iw/1:ih/2", "2.jpg"]
        console.log('Executing with args:', args);
        const result = await ffmpeg.exec(args);
        console.log('Result:', result);
        const fileData = await ffmpeg.readFile('2.jpg');
        const data = new Uint8Array(fileData as ArrayBuffer);
        if (imageRef.current) {
            imageRef.current.src = URL.createObjectURL(
                new Blob([data.buffer], { type: 'image/jpeg' })
            )
        }
    };

    return (
        <>
            <img ref={imageRef}></img>
            <br />
            <Button onClick={resize}>Resize image to half its size</Button>
            <p ref={messageRef}></p>
        </>
    )
}

export default ResizeExample

