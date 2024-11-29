import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {prompt} = await req.json()
        console.log(prompt);

        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());

        return NextResponse.json({'Result': JSON.parse(esult.response.text())})
    } catch(e) {
        return NextResponse.json({'Error: ': e})
    }
}