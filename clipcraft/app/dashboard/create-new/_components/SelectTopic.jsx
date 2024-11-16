"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react"


function SelectTopic() {
  const options = ['Custom', 'Random Story', 'Educational', 'Motivational', 'Fun Fact'];
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">Enter the topic of your video: </p>
      <Select onValueChange={(value) => setSelectedOption(value)}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Video Topic" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}

        </SelectContent>
      </Select>

      {selectedOption == 'Custom' &&
        <Textarea className="mt-3" placeholder='Enter your video idea...'/>
      }

    </div>
  )
}

export default SelectTopic
