import { Input, Typography } from '@material-tailwind/react'
import { useState } from 'react';
import Select from 'react-select';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
const SearchFilter = ({ option ,handler}) => {
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState('')

    const handleMultiple = (selected) => {
        const updatedOptions = selected.map((option) => ({
            value: option.value,
            label: option.label
        }))
        setSelected(updatedOptions)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    console.log(search);
    if(selected.length>0 || search !== ""){

         handler(selected,search)
    }
    return (
        <div className={`flex justify-between items-center md:h-14 px-4 bg-[#CAF0F8] ms-5 mt-4 rounded-lg `}>
            <div>
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={search}
                    onChange={handleSearchChange}
                    variant="outlined"
                />

            </div>
            <div className="flex items-center gap-4">
                <Typography className="">Filters</Typography>
                <Select
                    defaultValue="select"
                    isMulti
                    name="colors"
                    options={option.map(({ _id, departmentName }) => ({ value: _id, label: departmentName }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleMultiple}

                />


            </div>
        </div>
    )
}

export default SearchFilter
