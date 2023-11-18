'use client'
import Image from "next/image";
import { CustomFilterProps } from "@types";
import { updateSearchParams } from "@utils";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null); // Explicitly define the type

  // Close the options when clicking outside the component
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [optionsRef]);

  // Update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (value: string) => {
    const newPathName = updateSearchParams(title, value.toLowerCase());

    router.push(newPathName);
    setIsOpen(false); // Close the options after clicking on an option
  };

  return (
    <div className="w-fit" ref={optionsRef}>
      <div className="relative w-fit z-10">
        {/* Button for the listbox */}
        <div
          className="custom-filter__btn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block truncate">{selected.title}</span>
          <Image
            src="/chevron-up-down.svg"
            width={20}
            height={20}
            className={`ml-4 object-contain ${isOpen ? "transform rotate-180" : ""}`}
            alt="chevron_up-down"
          />
        </div>
        {/* Options dropdown */}
        {isOpen && (
          <div className="custom-filter__options">
            {/* Map over the options and display them as listbox options */}
            {options.map((option) => (
              <div
                key={option.title}
                className={`relative cursor-pointer select-none py-2 px-4 ${
                  selected.title === option.title
                    ? "bg-primary-blue text-white"
                    : "text-gray-900"
                }`}
                onClick={() => {
                  setSelected(option);
                  handleUpdateParams(option.title);
                }}
              >
                <span className={`block truncate ${selected.title === option.title ? "font-medium" : "font-normal"}`}>
                  {option.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
