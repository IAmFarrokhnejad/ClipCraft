import { NextResponse } from "next/server";
import * as PlayHT from "playht";
import fs from "fs";
import path from "path";

PlayHT.init({
    userId: process.env.PLAYHT_ID,
    apiKey: process.env.PLAYHT_API_KEY,
});

// API handler
export async function POST(req) {
    try {
        const { text, id } = await req.json();

        if (!text || !id) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        // File path for saving the audio
        const filePath = path.resolve("./public/audio", `${id}.mp3`);

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Generate TTS audio stream
        const stream = await PlayHT.stream(text, { voiceEngine: "Play3.0-mini" });

        // Create a write stream for saving the MP3 file
        const fileStream = fs.createWriteStream(filePath);

        // Pipe the audio stream into the file
        await new Promise((resolve, reject) => {
            stream.pipe(fileStream);
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        return NextResponse.json({
            Result: "Success",
            audioUrl: `/audio/${id}.mp3`, // Publicly accessible URL
        });
    } catch (error) {
        console.error("Error generating audio:", error);
        return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }
}
