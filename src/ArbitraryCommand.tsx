import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { fetchFile } from "@ffmpeg/util";
import { Button } from "./components/ui/button";
import React from "react";

import { Input } from "./components/ui/input";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./components/ui/form-no-rhf";
import { Progress } from "./components/ui/progress";
import { Textarea } from "./components/ui/textarea";

interface Form {
    inputFiles: FileList;
    outputFiles: string[];
    command: string;
}

type FileData = Uint8Array | string;

function ArbitraryCommand({ ffmpegRef }: { ffmpegRef: React.MutableRefObject<FFmpeg> }) {
    const [messages, setMessages] = useState<string[]>([]);
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const [progress, setProgress] = useState<number | null>(null)
    const [executionTime, setExecutionTime] = useState<number | null>(null)
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
        setMessages([...messages, message]);
    });
    ffmpeg.on("progress", ({ progress, time }) => {
        setProgress(progress);
        setExecutionTime(time);
    });

    // const [files, setFiles] = React.useState<FileList | null>(null);
    // const [inputFiles, setInputFiles] = React.useState<FileList | null>(null);

    // const resize = async () => {
    //     const imageURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/c81125391a0ada7599edc6bff2da51c1a3ed38d0/image.jpg";
    //     const ffmpeg = ffmpegRef.current;
    //     await ffmpeg.writeFile("1.jpg", await fetchFile(imageURL));
    //     // -i 1.jpg -vf scale="iw/1:ih/2" 2.jpg
    //     await ffmpeg.exec(["-i", "1.jpg", "-vf", "scale=iw/1:ih/2", "2.jpg"]);
    //     // await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
    //     const fileData = await ffmpeg.readFile('2.jpg');
    //     const data = new Uint8Array(fileData as ArrayBuffer);
    //     if (imageRef.current) {
    //         imageRef.current.src = URL.createObjectURL(
    //             new Blob([data.buffer], { type: 'video/mp4' })
    //         )
    //     }
    // };

    const [error, setError] = React.useState<Partial<Record<keyof Form, string>>>({});

    async function handleSubmit(form: Form) {
        console.log(form);
        const writeFilePromises: Promise<boolean>[] = [];
        const ffmpeg = ffmpegRef.current;
        for (const file of form.inputFiles) {
            writeFilePromises.push(ffmpeg.writeFile(file.name, new Uint8Array(await file.arrayBuffer())));
        }
        await Promise.all(writeFilePromises);
        // Do the execute
        const args = form.command.split(" ");
        console.log('Executing with args:', args);
        const result = await ffmpeg.exec(args);
        console.log('Result:', result);
        if (result !== 0) {
            setError({ command: "Error executing command" });
            return;
        }

        // Get the files
        const readFilePromises: Promise<FileData>[] = [];
        for (const file of form.outputFiles) {
            readFilePromises.push(ffmpeg.readFile(file));
        }
        const fileData = await Promise.all(readFilePromises);
        // Create download objects
        for (let i = 0; i < form.outputFiles.length; i++) {
            // Output name
            const outputFileName = form.outputFiles[i];
            // Detect the type from the file extension (last part of the string after the last ".")
            const type = outputFileName.split(".").pop();

            // Mime type for the file in the generic case
            let mimeType = "application/octet-stream";
            if (type === "mp4") {
                mimeType = "video/mp4";
            } else if (type === "jpg") {
                mimeType = "image/jpeg";
            } else if (type === "png") {
                mimeType = "image/png";
            } else if (type === "webp") {
                mimeType = "image/webp";
            }
            const file = new File([fileData[i] as ArrayBuffer], outputFileName, { type: mimeType });
            const url = URL.createObjectURL(file);
            console.log(file);
            console.log(url);
            const a = document.createElement('a');
            a.href = url;
            a.download = form.outputFiles[i];
            a.click();
        }

    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const error: Partial<Record<keyof Form, string>> = {};
                const inputFilesElement: HTMLInputElement = target.querySelector("input[name='inputFiles']")!;
                const outputFileNamesElement: HTMLInputElement = target.querySelector("input[name='outputFileNames']")!;
                const commandElement: HTMLInputElement = target.querySelector("input[name='command']")!;
                if (!inputFilesElement.files || inputFilesElement.files.length === 0) {
                    error.inputFiles = "At least one input file is required";
                }
                if (!outputFileNamesElement.value) {
                    error.outputFiles = "At least one output filename is required";
                }
                if (!commandElement.value) {
                    error.command = "A command is required";
                }
                setError(error);
                if (Object.values(error).length > 0) {
                    return;
                }
                void handleSubmit({
                    inputFiles: inputFilesElement.files!,
                    outputFiles: outputFileNamesElement.value.split(" "),
                    command: commandElement.value,
                });
            }} className="space-y-8">
                <FormItem>
                    <FormLabel>Input Files</FormLabel>
                    <FormControl>
                        <Input name="inputFiles" type="file" multiple />
                    </FormControl>
                    <FormDescription>
                        These are the input files to be stored and read by FFMPEG.
                    </FormDescription>
                    <FormMessage>
                        {error.inputFiles}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Output File Names</FormLabel>
                    <FormControl>
                        <Input name="outputFileNames" type="text" placeholder="Output File Names" />
                    </FormControl>
                    <FormDescription>
                        These are the output file names to be written by FFMPEG.
                    </FormDescription>
                    <FormMessage>
                        {error.outputFiles}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input name="command" type="text" placeholder="Command" />
                    </FormControl>
                    <FormDescription>
                        Arguments to be given to FFMPEG.
                    </FormDescription>
                    <FormMessage>
                        {error.command}
                    </FormMessage>
                </FormItem>
                <Button type="submit">Execute</Button>
            </form>
            {progress && <Progress value={progress}></Progress>}
            {executionTime && <p>Execution time:{" "}{executionTime}</p>}
            <p ref={messageRef}></p>
            <h6>Log</h6>
            <Button onClick={() => setMessages([])}>Clear log</Button>
            <Textarea value={messages.join("\n")} readOnly></Textarea>
        </>
    )

    // return (
    //     <>


    //         <form onSubmit={(e) => {
    //             e.preventDefault();
    //             console.log(e);
    //         }} className="space-y-8">
    //             <Label>Input Files</Label>
    //             <Slot>
    //                 <Input type="file" multiple />
    //             </Slot>
    //             <p className={cn("text-[0.8rem] text-muted-foreground")}>
    //                 These are the input files to be stored and read by FFMPEG.
    //             </p>
    //             <Label>Output File Names</Label>
    //             <Slot>
    //                 <Input type="text" placeholder="Output File Names" />
    //             </Slot>
    //             <p className={cn("text-[0.8rem] text-muted-foreground")}>
    //                 These are the output file names to be written by FFMPEG.
    //             </p>
    //             <Label>Username</Label>
    //             <Slot>
    //                 <Input type="text" placeholder="Command" />
    //             </Slot>
    //             <p className={cn("text-[0.8rem] text-muted-foreground")}>
    //                 Arguments to be given to FFMPEG.
    //             </p>
    //             <Button type="submit">Execute</Button>
    //         </form >

    //         {/* <input type="file" onChange={(e) => setInputFiles(e.target.files)} />
    //         <img ref={imageRef}></img>
    //         <br />
    //         <Button onClick={() => { void resize() }}>Resize image to half its size</Button>
    //         <p ref={messageRef}></p> */}
    //     </>
    // )
}

export default ArbitraryCommand

