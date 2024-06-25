import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FfmpegProviderState {
    ffmpeg: FFmpeg
    loaded: boolean
  }

const initialState: FfmpegProviderState = {
    ffmpeg: new FFmpeg(),
    loaded: false
}

const FfmpegContext = createContext<FfmpegProviderState>(initialState);

// Custom hook to access the Ffmpeg context
export const useFfmpeg = () => useContext(FfmpegContext);

// FfmpegProvider component to wrap your app with the Ffmpeg context
export const FfmpegProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ffmpeg] = useState(() => new FFmpeg());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        load();


        return () => {
            ffmpeg.terminate();
            setLoaded(false);
        }
    }, [ffmpeg]);

    const load = async () => {
        const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";

        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        const loadResult = await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                "application/wasm"
            ),
            workerURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.worker.js`,
                "text/javascript"
            ),
        });
        console.log("FFMPEG loaded")
        if (loadResult === false) {
            console.warn("load method called multiple times")
        }
        setLoaded(true);
    };


    return (
        <FfmpegContext.Provider value={{ffmpeg, loaded}}>
            { children }
        </FfmpegContext.Provider>
    );
};