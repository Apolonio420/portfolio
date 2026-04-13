import { GoogleGenerativeAI } from "@google/generative-ai";

const STYLES: Record<string, string> = {
  "neon-cyberpunk":
    "neon cyberpunk art, glowing edges, dark background, futuristic, vibrant neon colors, electric blue and hot pink, sci-fi aesthetic",
  "sticker-pop":
    "sticker style pop art, bold outlines, flat vibrant colors, fun playful design, die-cut sticker look, white border",
  "vintage-retro":
    "vintage retro poster art, worn texture, muted warm colors, 70s aesthetic, screen print style, distressed edges",
  "minimal-line":
    "minimalist line art, clean single-weight lines, negative space, elegant simplicity, monochrome black on white",
  "watercolor":
    "watercolor painting style, soft flowing colors, organic edges, artistic splashes, delicate transparent layers",
  "pixel-art":
    "pixel art retro 8-bit style, crisp pixels, limited color palette, nostalgic video game aesthetic, blocky shapes",
  "manga-anime":
    "manga anime illustration, Japanese art style, dynamic pose, bold ink lines, cel shading, vibrant colors",
  "3d-glass":
    "3D translucent glass material, glossy reflections, iridescent, floating in space, soft studio lighting, futuristic",
  "street-graffiti":
    "urban street art graffiti style, spray paint texture, bold lettering, drips, concrete wall background, raw energy",
  "geometric":
    "geometric abstract art, precise shapes, sacred geometry, gradients, modern clean composition, mathematical patterns",
  "botanical":
    "botanical vintage illustration, detailed scientific drawing, natural colors, floral arrangement, engraving style",
  "surreal-collage":
    "surrealist collage art, dreamlike composition, mixed media, unexpected juxtapositions, psychedelic, vibrant",
};

export async function POST(request: Request) {
  try {
    const { prompt, style } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const styleKeywords = STYLES[style] || STYLES["neon-cyberpunk"];

    const finalPrompt = `Create a stunning product design illustration: ${prompt.slice(0, 200)}.
Style: ${styleKeywords}.
High resolution, centered composition, isolated design element, clean background.
Professional product photography quality, ready for merchandise printing.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-image-preview",
      generationConfig: {
        // @ts-expect-error - responseModalities not in types yet
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const result = await model.generateContent(finalPrompt);
    const response = result.response;

    // Extract image from response parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      return Response.json({ error: "No response from model" }, { status: 500 });
    }

    for (const part of parts) {
      if (part.inlineData) {
        return Response.json({
          imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          prompt: prompt,
          style: style,
        });
      }
    }

    return Response.json({ error: "No image generated" }, { status: 500 });
  } catch (err) {
    console.error("[generate] Error:", err);
    return Response.json(
      { error: "Generation failed. Try again." },
      { status: 500 }
    );
  }
}
