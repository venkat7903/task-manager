import React from "react";
import { MdSearch } from "react-icons/md";
const Header = (props) => {
  const { searchText, setSearchText } = props.searchDetails;

  return (
    <div className="bg-gray-200 p-[20px] rounded-xl flex items-center justify-between shadow-sm shadow-gray-600">
      <div className="bg-white flex items-center w-[70%] max-w-[300px] rounded-full h-[40px] px-[10px]">
        <MdSearch size={25} />
        <input
          className="bg-transparent outline-none ml-[6px] flex-1"
          type="search"
          placeholder="Search Project"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      <select className="p-[5px] border border-black rounded">
        <option className="'flex items-center">Filter</option>
      </select>
    </div>
  );
};

export default Header;
