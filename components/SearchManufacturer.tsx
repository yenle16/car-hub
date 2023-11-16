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
    console.log(manufacturers)
    return (
        <div className='search-manufacturer'>
            <div className="relative w-full">
                <div className="relative">
                    <label htmlFor="manufacturer" className="sr-only">
                        Select Manufacturer
                    </label>
                    <select
                        id="manufacturer"
                        name="manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {manufacturers.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {query !== '' && filteredManufacturers.length === 0 && (
                    <div className="mt-1">
                        <p className="text-sm text-gray-500">Create "{query}"</p>
                    </div>
                )}

                {filteredManufacturers.length > 0 && (
                    <div className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredManufacturers.map((item) => (
                            <div
                                key={item}
                                className="cursor-pointer select-option py-2 px-4 text-gray-900 hover:bg-primary-blue hover:text-white"
                                onClick={() => setManufacturer(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchManufacturer