import { useFfmpeg } from "@/components/ffmpeg-provider";


function Introduction() {

    const ffmpeg = useFfmpeg();

    console.log(ffmpeg)

    return (
        <div>
            <h1>Introduction</h1>
            <p>
                This is the introduction page.
            </p>
            <p>
                {JSON.stringify(ffmpeg)}
            </p>
        </div>
    );
}

export default Introduction