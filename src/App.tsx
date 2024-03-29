import { useState, useRef, MutableRefObject } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import './App.css'
import { Button } from "./components/ui/button";
import TranscodeExample from "./examples/TranscodeAviToMp4Example";
import ResizeExample from "./examples/ResizeExample";
import ArbitraryCommand from "./ArbitraryCommand";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "./components/ui/select";
enum Example {
  AVI_TO_MP4 = "AVI to MP4",
  JPG_RESIZE = "JPG resize",
  ARBITRARY = "Arbitrary FFMPEG command",
}

const getExampleBody = (selectedExample: Example, ffmpegRef: MutableRefObject<FFmpeg>) => {
  switch (selectedExample) {
    case Example.AVI_TO_MP4:
      return <TranscodeExample ffmpegRef={ffmpegRef} />;
    case Example.JPG_RESIZE:
      return <ResizeExample ffmpegRef={ffmpegRef} />;
    case Example.ARBITRARY:
      return <ArbitraryCommand ffmpegRef={ffmpegRef} />;
  }
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
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
    setLoaded(true);
  };

  return (<div className="container relative"> {loaded ? (
    <>
      <Select onValueChange={(value) => setSelectedExample(value as Example | null)}>
        <SelectTrigger>
          <SelectValue placeholder="Choose example" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(Example).map(([name, value]) => {
            return (
              <SelectItem
                key={name}
                value={value}
                onChange={() => setSelectedExample(value)}
              >
                {value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {selectedExample && getExampleBody(selectedExample, ffmpegRef)}
    </>
  ) : (
    <Button onClick={load}>Load ffmpeg-core</Button>
  )}
  </div>);
}

export default App
