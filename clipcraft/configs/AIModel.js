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
        { text: "Write a script to generate a 30 second video for the following topic: Any topic along with AI image prompt, realistic format for each scene and give the result in JSON format with imagePrompt and content text as a field " },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "This script outlines a 30-second video about the future of sustainable farming using AI.  It's designed to be easily adaptable to other topics.  The JSON output provides the data for image generation and video editing.\n\n**Video Topic:** The Future of Sustainable Farming with AI\n\n**Script:**\n\n**(Scene 1: 0-5 seconds)**\n\n* **Visual:** Lush, green farm fields with advanced irrigation systems subtly visible.  Drone shot slowly panning across.\n* **Audio:** Uplifting, hopeful music begins.  Narrator: \"Imagine a future where farming is not only sustainable but hyper-efficient.\"\n\n\n**(Scene 2: 5-10 seconds)**\n\n* **Visual:** Close-up shot of a farmer using a tablet displaying AI-powered data on soil health, crop growth, and water usage.\n* **Audio:**  Narrator: \"AI-powered precision agriculture is revolutionizing the way we grow our food.\"\n\n\n**(Scene 3: 10-15 seconds)**\n\n* **Visual:**  Timelapse of crops growing rapidly and healthily.  Possibly some robotic assistance subtly in the background.\n* **Audio:**  Narrator: \"Optimized resource management, minimized waste, maximized yields.\"\n\n\n**(Scene 4: 15-20 seconds)**\n\n* **Visual:**  A diverse range of healthy fruits and vegetables harvested, showcasing abundance.\n* **Audio:**  Narrator: \"Feeding a growing population sustainably is no longer a challenge, but a possibility.\"\n\n\n**(Scene 5: 20-25 seconds)**\n\n* **Visual:**  A family enjoying a meal made with the freshly harvested produce.  Focus on happy faces and healthy food.\n* **Audio:**  Music swells slightly.\n\n\n**(Scene 6: 25-30 seconds)**\n\n* **Visual:**  Text overlay: \"The Future of Farming is Here. Powered by AI.\"  Final shot of the farm, sun setting.\n* **Audio:**  Music fades out.\n\n\n**JSON Output:**\n\n```json\n[\n  {\n    \"imagePrompt\": \"Lush green farm fields with advanced irrigation systems, drone shot, golden hour lighting, realistic, 8k\",\n    \"contentText\": \"Imagine a future where farming is not only sustainable but hyper-efficient.\"\n  },\n  {\n    \"imagePrompt\": \"Close-up of a farmer using a tablet displaying AI-powered data on soil health, crop growth, and water usage, realistic, detailed, high resolution\",\n    \"contentText\": \"AI-powered precision agriculture is revolutionizing the way we grow our food.\"\n  },\n  {\n    \"imagePrompt\": \"Timelapse of healthy crops growing rapidly, subtle robotic assistance in background, vibrant colors, realistic, cinematic lighting\",\n    \"contentText\": \"Optimized resource management, minimized waste, maximized yields.\"\n  },\n  {\n    \"imagePrompt\": \"Abundant harvest of diverse fruits and vegetables, vibrant colors, realistic textures, shallow depth of field, cinematic lighting\",\n    \"contentText\": \"Feeding a growing population sustainably is no longer a challenge, but a possibility.\"\n  },\n  {\n    \"imagePrompt\": \"Happy family enjoying a meal made with fresh produce, warm lighting, realistic, focus on happy faces and healthy food\",\n    \"contentText\": \"\" \n  },\n  {\n    \"imagePrompt\": \"Text overlay: 'The Future of Farming is Here. Powered by AI.', sunset over a lush farm, realistic, cinematic\",\n    \"contentText\": \"\"\n  }\n]\n```\n\n**Note:**  This JSON provides prompts for AI image generation tools like Midjourney, Dall-E 2, or Stable Diffusion.  The `contentText` field provides the narration for each scene.  You would use a video editing software to assemble the generated images with the audio narration.  Adjust the image prompts and text as needed for different topics. Remember to always respect copyright and usage rights of AI generated images.\n" },
      ],
    },
  ],
});