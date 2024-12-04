import { NextResponse } from "next/server";
import * as PlayHT from "playht";
import { createClient } from "@supabase/supabase-js";
import stream from "stream";

PlayHT.init({
    userId: process.env.PLAYHT_ID,
    apiKey: process.env.PLAYHT_API_KEY,
});

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// API handler
export async function POST(req) {
    try {
        const { text, id } = await req.json();

        if (!text || !id) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        // Generate TTS audio stream
        const audioStream = await PlayHT.stream(text, { voiceEngine: "Play3.0-mini" });

        // Collect audio stream data into a buffer
        const audioBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            audioStream.on("data", (chunk) => chunks.push(chunk));
            audioStream.on("end", () => resolve(Buffer.concat(chunks)));
            audioStream.on("error", (error) => reject(error));
        });

        // Upload the MP3 file to Supabase Storage
        const bucketName = "ClipCraftFiles"; // Replace with your Supabase bucket name
        const filePath = `${id}.mp3`; // File path within the bucket

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, audioBuffer, {
                contentType: "audio/mpeg",
            });

        if (error) {
            console.error("Error uploading file to Supabase:", error);
            return NextResponse.json({ error: "Failed to upload audio" }, { status: 500 });
        }

        // Generate a public URL for the uploaded audio file
        const { publicUrl } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return NextResponse.json({
            Result: "Success",
            audioUrl: publicUrl, // Publicly accessible URL
        });
    } catch (error) {
        console.error("Error generating audio:", error);
        return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }
}
