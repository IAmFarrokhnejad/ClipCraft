"use client"

import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";
import { useState } from "react";


function VideoList({ VideoList }) {

    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    return (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {VideoList?.map((video, index) => (
                <div className="cursor:pointer hover:scale-105 transition-all" onClick={() => {setOpenPlayerDialog(Date.now()); setVideoId(video?.id)}}>
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={250}
                        compositionHeight={377}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{
                            borderRadius:15
                        }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: (v) => console.log(v)
                        }}
                    />
                </div>
            ))}

            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId}/>
        </div>
    )
}

export default VideoList
