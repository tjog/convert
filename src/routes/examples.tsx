import ArbitraryCommand from "@/ArbitraryCommand";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResizeExample from "@/examples/ResizeExample";
import TranscodeExample from "@/examples/TranscodeAviToMp4Example";
import { useState } from "react";

enum Example {
    AVI_TO_MP4 = "AVI to MP4",
    JPG_RESIZE = "JPG resize",
    ARBITRARY = "Arbitrary FFMPEG command",
}

const getExampleBody = (selectedExample: Example) => {
    switch (selectedExample) {
        case Example.AVI_TO_MP4:
            return <TranscodeExample/>;
        case Example.JPG_RESIZE:
            return <ResizeExample/>;
        case Example.ARBITRARY:
            return <ArbitraryCommand/>;
    }
};

function Examples() {
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);

    return (
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
            {selectedExample && getExampleBody(selectedExample)}
        </>
    );
}

export default Examples;