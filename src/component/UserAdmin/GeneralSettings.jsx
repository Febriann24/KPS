import H from "../H&F/Header";
import F from "../H&F/Footer";
import Sidebar from "./SideBar";
import axios from 'axios';
import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";

const GeneralSettings = () => {

  const[datas, setData] = useState({});
  useState

  const initGensetList = async () => {
    try{
      const response = await axios.get('http://localhost:5000/getAllGenset');
      setData(response.data);
    } catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    initGensetList();
  }, []);


  return (
    <div className="bg-[#F1F1F1]">
      <H />
      <div className="flex">
        <Sidebar />
        {/* MAIN CONTENT */}
        <div className="flex flex-col w-full p-5 mx-[50px]">
          {/* SEARCH BUTTONS */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-10 bg-[#F1F1F1] p-5">
              <div className="flex items-center">
                <select
                  name="searchBy"
                  className="bg-[rgb(255,255,255)] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] p-2 rounded-md h-[40px] text-[18px]"
                >
                  <option>GS Name</option>
                  <option>GS Code</option>
                </select>
                <div className="shadow-[1px_3px_1px_rgba(0,0,0,0.1)] bg-white rounded-lg p-[5px] h-full mx-4">
                  <input
                    type="text"
                    name="search"
                    placeholder=""
                    className="p-[10px] rounded-lg bg-gray-100 h-[29px]"
                  />
                </div>
                <button className="bg-[#74ccc3] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] text-white rounded p-2 w-[40px] h-[39px]">
                  <MagnifyingGlassIcon className="w-full h-full" />
                </button>
              </div>
              <div className="flex items-center">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md ml-4 w-[100px] h-[40px] flex items-center">
                  Filter
                  <AdjustmentsHorizontalIcon className="ml-1 h-full" />
                </button>
              </div>
            </div>

            {/* SEARCH TABLE */}
            <div className="pt-[80px] bg-gray-100">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-6 py-3 text-left font-extrabold border">Nama <span className="inline-block">&#8595;</span></th>
                    <th className="px-6 py-3 text-left font-extrabold border">Deskripsi</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Kode <span className="inline-block">&#8595;</span></th>
                    <th className="px-6 py-3 text-left font-extrabold border">Value Type</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Value</th>
                    <th className="px-6 py-3 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length > 0 ? (
                    datas.map((data,index) => (
                        <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-6 py-4 border">data.GS_NAME</td>
                        <td className="px-6 py-4 border">data.GS_DESC</td>
                        <td className="px-6 py-4 border">data.GS_CODE</td>
                        <td className="px-6 py-4 border">data.DATA_TYPE</td>
                        <td className="px-6 py-4 border">data.GS_VALUE</td>
                        <td className="px-6 py-4 border text-center">
                          <PencilSquareIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
                        </td>
                      </tr>

                    ))
                  ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 border text-red-500 font-bold text-lg text-center">No Genset Found</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default GeneralSettings;
