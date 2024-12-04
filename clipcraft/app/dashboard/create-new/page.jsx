"use client"
import axios from "axios";
import { useState } from "react"
import SelectTopic from "./_components/SelectTopic"
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData = 'It was a long day. I was exhausted after my shift so I decided to go to sleep as soon as I arrived home, however, my friend called me on my way home.'

function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();

  const onHandleInputChange = (fieldName, filedValue) => {

    setFormData(prev => ({
      ...prev,
      [fieldName]: filedValue
    }))
  }

  const onCreateClickHandler = () => {
    //getVideoScript();

    GenerateAudioFile(scriptData);
  }

  //Get video script
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate a ${formData.duration} video on the following topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give the result in JSON format with imagePrompt and ContentText as fields`;

    try {
      const result = await axios.post("/api/get-video-script", { prompt });
      console.log("Full API Response:", result); // Log the entire response
      console.log("Response Data:", result.data); // Log the `data` field

      const videoScriptData = result.data?.result;
      if (!videoScriptData || !Array.isArray(videoScriptData)) {
        console.error("Unexpected data structure:", videoScriptData);
        return;
      }

      setVideoScript(videoScriptData);
      GenerateAudioFile(videoScriptData);
    } catch (error) {
      console.error("Error generating video script:", error);
    } finally {
      setLoading(false);
    }
  };




  const GenerateAudioFile = async (videoScriptData) => {
    if (!videoScriptData || !Array.isArray(videoScriptData)) {
      console.error("Invalid videoScriptData:", videoScriptData);
      return;
    }

    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script = script + item.ContentText + ' ';
    });

    await axios.post('/api/generate-audio', {
      text: videoScriptData,
      id: id
    }).then(resp=>{
      console.log(resp.data);
      setAudioFileUrl(resp.data.result);
    })
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary  text-center">Create New</h2>

      <div className="m-10 shadow-md p-10">

        {/*Select Topic*/}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/*Select Style*/}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/*Duration*/}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/*Create Button*/}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Video</Button>
      </div>

      <CustomLoading loading={loading} />
    </div>
  )
}

export default CreateNew