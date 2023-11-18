import { manufacturers } from '@constants';
import { SearchManufacturerProps } from '@types'
import React, { useState } from 'react'

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState("");

    const filteredManufacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((item) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
    const handleOptionClick = (value: string) => {
        setManufacturer(value);
        setQuery("");
    };

    return (
        <div className="search-manufacturer">
      <div className="relative w-full">
        {/* Button for the combobox. Click on the icon to see the complete dropdown */}
        <div className="absolute top-14">
          <img
            src="/car-logo.svg"
            width={20}
            height={20}
            className="ml-4"
            alt="car logo"
          />
        </div>

        {/* Input field for searching */}
        <input
          type="text"
          className="search-manufacturer__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Volkswagen..."
        />

        {/* Options dropdown */}
        {query !== "" && (
          <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredManufacturers.length === 0 ? (
              <div
                className="search-manufacturer__option"
                onClick={() => handleOptionClick(query)}
              >
                Create "{query}"
              </div>
            ) : (
              filteredManufacturers.map((item) => (
                <div
                  key={item}
                  className={`relative search-manufacturer__option cursor-pointer ${
                    manufacturer === item
                      ? "bg-primary-blue text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => handleOptionClick(item)}
                >
                  <span className="block truncate">
                    {item}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchManufacturer