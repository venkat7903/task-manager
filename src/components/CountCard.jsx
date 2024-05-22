import React from "react";

const CountCard = (props) => {
  const { name, icon, value, bg } = props.cardDetails;
  return (
    <div className="h-[170px] w-full mb-[20px] hover:scale-105 duration-500 shadow-sm shadow-gray-500 pl-[30px] pr-[10px] rounded-lg flex flex-col justify-center items-start bg-gray-200">
      <div className={`${bg} p-[8px] rounded-full mb-[10px]`}>{icon()}</div>
      <p className="text-gray-600">{name}</p>
      <p className="text-[30px] font-semibold">{value}</p>
    </div>
  );
};

export default CountCard;
