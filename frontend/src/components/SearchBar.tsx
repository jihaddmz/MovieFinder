import {Search} from "lucide-react";
import {useState} from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({value, onChange}: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={`flex items-center text-gray-400 bg-gray-700 hover:bg-gray-600 rounded-full transition-all  outline-primary ${isFocused ? "outline-2" : "outline-0"}`}>
            <Search className=" ms-5"/>
            <input className="w-full p-4 rounded-full outline-none" value={value}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
                   onChange={(e) => onChange(e.target.value)} placeholder="Search Movies"/>
        </div>
    );
};

export default SearchBar;