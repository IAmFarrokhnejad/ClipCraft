const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Write a script to generate a 30 second video on the following topic: Interesting historical story along with AI image prompt in realistic format for each scene and give the result in JSON format with imagePrompt and ContentText as field" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n[\n  {\n    \"imagePrompt\": \"A dramatic, realistic painting of a bustling 18th-century Parisian street, cobblestones wet from rain, gas lamps flickering, people in period clothing hurrying past, a shadowy figure in a long coat observing from a doorway.\",\n    \"ContentText\": \"Paris, 1789. The city crackled with a nervous energy. Whispers of revolution filled the air, a simmering discontent boiling beneath the surface of opulent society.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic portrait of a young, determined woman, dressed in simple but elegant clothing, holding a quill and looking directly at the viewer with a thoughtful expression.  Natural lighting, slightly smudged ink on her fingers.\",\n    \"ContentText\": \"Meet Olympe de Gouges, a playwright and activist, a voice crying out for equality in a world ruled by men.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic depiction of a dimly lit meeting room, smoke curling from candles, several people in period clothing intensely discussing documents around a large table, expressions of both excitement and apprehension.\",\n    \"ContentText\": \"Secretly, she drafted the Declaration of the Rights of Woman and of the Female Citizen, a bold challenge to the all-male National Assembly.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic illustration of a pamphlet being printed on an old-fashioned printing press, with ink smudges and the title 'Declaration of the Rights of Woman and of the Female Citizen' clearly visible.\",\n    \"ContentText\": \"Her words, echoing the revolutionary ideals of liberty and equality, were printed and distributed, igniting a spark of hope among women.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic, somber painting of Olympe de Gouges in prison, her face etched with worry, looking out a barred window.  Dim lighting, a single candle flickering.\",\n    \"ContentText\": \"But her bravery came at a price.  For daring to challenge the established order, she faced the wrath of the revolutionary government.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic image of the guillotine, with a crowd of onlookers in the background, their faces obscured by shadow and distance.  Focus on the chilling, imposing nature of the machine.\",\n    \"ContentText\": \"In 1793, Olympe de Gouges was sent to the guillotine, a victim of the very revolution she had championed.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic close-up of Olympe de Gouges's Declaration, slightly aged and worn, with a single red rose resting on top.  Soft, warm lighting.\",\n    \"ContentText\": \"Though silenced, her words continue to inspire.  Her legacy as a pioneer for women's rights lives on.\"\n  }\n]\n```\n\n**Note:**  This JSON provides the prompts and text for a 30-second video.  To create the video, you would need to use a video editing software and an AI image generation tool (like Midjourney, DALL-E 2, Stable Diffusion, etc.) to create the images from the prompts.  The timing of each scene would need to be adjusted to fit within the 30-second timeframe.  You might need to shorten some text or combine scenes to achieve this.  The success of the visual representation depends heavily on the capabilities of the AI image generator used.  Realistic results are not guaranteed.\n" },
      ],
    },
  ],
});