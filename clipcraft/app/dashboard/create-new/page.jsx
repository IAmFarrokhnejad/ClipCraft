"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";



function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [videoData, setVideoData] = useContext(VideoDataContext);
  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = async () => {
    setLoading(true);
    try {
      const scriptData = await getVideoScript();
      const fileUrl = await generateAudioFile(scriptData);
      const captions = await generateAudioCaption(fileUrl);
      const images = await generateImages(scriptData);

      setVideoData({ videoScript: scriptData, audioFileUrl: fileUrl, captions, imageList: images });
    } catch (error) {
      console.error("Error creating video:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoScript = async () => {
    const prompt = `Write a script to generate a ${formData.duration} video on the topic: ${formData.topic}, along with AI image prompts in ${formData.imageStyle} format for each scene. Return JSON with fields imagePrompt and ContentText.`;

    const response = await axios.post("/api/get-video-script", { prompt });
    const scriptData = response.data?.result;
    if (!scriptData || !Array.isArray(scriptData)) {
      throw new Error("Invalid script data.");
    }
    setVideoScript(scriptData);
    return scriptData;
  };

  const generateAudioFile = async (scriptData) => {
    const id = uuidv4();
    const scriptText = scriptData.map((item) => item.ContentText).join(" ");
    const response = await axios.post("/api/generate-audio", { text: scriptText, id });
    const fileUrl = response.data?.result;
    if (!fileUrl) throw new Error("Audio file generation failed.");
    return fileUrl;
  };

  const generateAudioCaption = async (fileUrl) => {
    const response = await axios.post("/api/generate-caption", { audioFileUrl: fileUrl });
    const captions = response.data?.result;
    if (!captions) throw new Error("Caption generation failed.");
    return captions;
  };

  const generateImages = async (scriptData) => {
    const images = [];
    for (const { imagePrompt } of scriptData) {
      try {
        const response = await axios.post("/api/generate-image", { prompt: imagePrompt });
        images.push(response.data?.result);
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
    return images;
  };

  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      SaveVideoData(videoData);
    }

  }, [videoData])

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.caption,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData?.id })

    setVideoId(result[0].id);
    setPlayVideo(true);
    setLoading(false);

  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
      <div className="m-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler} disabled={loading}>
          Create Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}

export default CreateNew;