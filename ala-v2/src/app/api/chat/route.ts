import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OpenAI API Key not configured. Please add it to your .env.local" },
                { status: 500 }
            );
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are the Artificial Ledger Airlines (ALA) Assistant. You help users with flight bookings, checking flight status, and general travel inquiries. Be professional, helpful, and friendly. If users ask about specific flights, you can mention we have domestic flights in the Philippines (like Manila, El Nido, Cebu) and international flights (Tokyo, London, New York)."
                },
                ...messages
            ],
            temperature: 0.7,
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });
    } catch (error: any) {
        console.error('Chatbot API Error:', error);
        return NextResponse.json(
            { error: error.message || "Failed to process chat" },
            { status: 500 }
        );
    }
}
