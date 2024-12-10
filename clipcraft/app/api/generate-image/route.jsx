import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,
        };

        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            { input }
        );

        const base64Image = "data:image/png;base64," + await convertToImage(output[0]);
        const fileName = `ClipCraftFiles/${Date.now()}.png`;

        const { data, error } = await supabase.storage
            .from("public-files") // Replace with your Supabase bucket name
            .upload(fileName, Buffer.from(base64Image.split(",")[1], "base64"), {
                contentType: "image/png",
            });

        if (error) throw error;

        const { publicURL } = supabase.storage
            .from("public-files")
            .getPublicUrl(fileName);

        return NextResponse.json({ result: publicURL });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to process the request." }, { status: 500 });
    }
}

const convertToImage = async (imageUrl) => {
    try {
        const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(resp.data).toString("base64");
    } catch (e) {
        console.error("Error converting to image:", e);
        throw e;
    }
};