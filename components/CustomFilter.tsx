'use client'
import {  useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateSearchParams } from "@utils";

type CustomFilterProps = {
  title: string;
  options: Array<{ title: string; value: string }>;
};

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();

  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  // Update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName);
  };

  return (
    <div className="w-fit">
      <div className="mb-2 text-sm font-semibold">{title}</div>

      <div className="flex">
        <button
          onClick={() => setSelected(options[0])}
          className={`rounded-md border border-gray-200 px-3 py-1 text-left ${
            selected === options[0] ? "bg-gray-200" : "bg-white"
          }`}
        >
          All
        </button>

        {options.slice(1).map((option, index) => (
          <button
            key={option.value}
            onClick={() => setSelected(option)}
            className={`ml-2 rounded-md border border-gray-200 px-3 py-1 text-left ${
              selected === option ? "bg-gray-200" : "bg-white"
            }`}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomFilter;