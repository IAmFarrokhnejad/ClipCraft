"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function SelectDuration({ onUserSelect }) {
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Duration</h2>
      <p className="text-gray-500">Enter the duration of your video: </p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          onUserSelect('duration', value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
          <SelectItem value="60 Seconds">60 Seconds</SelectItem>
          <SelectItem value="90 Seconds">90 Seconds</SelectItem>
          <SelectItem value="120 Seconds">120 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
