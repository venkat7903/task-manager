import React from "react";
import { MdSearch } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
const Header = (props) => {
  const { searchText, setSearchText, orderBy, setOrderBy } =
    props.searchDetails;

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
      <div className="flex items-center">
        <CiFilter size={25} />
        <select
          value={orderBy}
          onChange={(event) => setOrderBy(event.target.value)}
          className="p-[5px] border border-black rounded"
        >
          <option className="'flex items-center" value="id">
            Default
          </option>
          <option className="'flex items-center" value="deadline">
            Date
          </option>
        </select>
      </div>
    </div>
  );
};

export default Header;
