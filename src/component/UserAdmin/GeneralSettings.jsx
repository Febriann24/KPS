import H from "../H&F/Header";
import F from "../H&F/Footer";
import Sidebar from "./SideBar";
import axios from 'axios';
import ModalFilterGenset from "./FilterModalGenset";
import ModalEditGenset from "./ModalEditGenset";
import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilSquareIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";

const GeneralSettings = () => {

  const [datas, setData] = useState({});
  const [searchBy, setSearchBy] = useState('GS_CODE');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [advancedFilterData, setAdvancedFilterData] = useState({});
  const [selectedGenset, setSelectedGenset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    initGensetList();
  }, [selectedGenset]);

  const initGensetList = async () => {
    try{
      const response = await axios.get('http://localhost:5000/getAllGenset');
      setData(response.data);
    } catch(e){
      console.log(e);
    }
  };

  const handleSearch = async () => {
    try{
    const reqBody = {};

    if (searchBy) {
      reqBody.searchByValue = searchBy;
    }
    if (searchQuery) {
      reqBody.searchQueryValue = searchQuery;
    }
    if (Object.keys(advancedFilterData).length > 0) {
      reqBody.advancedFilters = advancedFilterData;
    }
      const response = await axios.post('http://localhost:5000/getGensetFiltered', reqBody);
      setData(response.data);
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="bg-[#F1F1F1]">
      <H />
      <div className="flex">
        <Sidebar />
        {/* MAIN CONTENT */}
        <div className="flex flex-col w-full p-5 mx-[50px]">
          {/* SEARCH BUTTONS */}
          <div className="relative">
            <div className="rounded-md flex items-center justify-between bg-[#F1F1F1] p-5">
              <div className="flex items-center">
                <select
                  name="searchBy"
                  value={searchBy}
                  className="bg-[rgb(255,255,255)] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] p-2 rounded-md h-[40px] text-[18px]"
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="GS_NAME">Nama</option>
                  <option value="GS_CODE">Kode</option>
                </select>
                <div className="shadow-[1px_3px_1px_rgba(0,0,0,0.1)] bg-white rounded-lg p-[5px] h-full mx-4">
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    placeholder=""
                    className="p-[10px] rounded-lg bg-gray-100 h-[29px]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="bg-[#74ccc3] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] text-white rounded p-2 w-[40px] h-[39px]"
                  onClick={handleSearch}
                >
                  <MagnifyingGlassIcon className="w-full h-full" />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                className="bg-gray-700 text-white px-4 py-2 rounded-md ml-4 w-[100px] h-[40px] flex items-center"
                onClick={(e) => setIsFilterOpened(true)}>
                  Filter
                  <AdjustmentsHorizontalIcon className="ml-1 h-full" />
                </button>
                <button 
                className=" inline-block bg-red-500 p-2 rounded-md ml-1 w-[40px] h-[40px] flex items-center"
                title="Hapus Filter"
                onClick={(e) => setAdvancedFilterData({})}>
                  <XMarkIcon className=" h-full" />
                </button>
              </div>
            </div>
            {/* {LIST FILTER} */}
            <div className = "flex item-center justify-between">
              <span className="rounded-tl-lg bg-[#36616e] flex px-2 pt-2 item-center text-[#ffffff]">Active Filters:</span>
              <div className="rounded-tr-lg p-2 flex items-center justify-center flex-1 bg-gradient-to-r from-[#36616e] to-[#c6d4e7] space-x-3">
              {advancedFilterData && Object.keys(advancedFilterData).length > 0 ? (
                Object.entries(advancedFilterData)
                .filter(([key, value]) => value)
                .map(([key, value], index) => (
                  <span key={index} className="bg-[#77bbb4] shadow-md text-white rounded-full px-6 py-1 text-sm">
                  {key}: {value}
                </span>
                ))
              ) : (
                <span>No filters selected</span>
              )}
              </div>
            </div>
        
            {/* SEARCH TABLE */}
            <div className="bg-gray-100 p-5">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-6 py-3 text-left font-extrabold border">Nama <span className="inline-block">&#8595;</span></th>
                    <th className="px-6 py-3 text-left font-extrabold border">Deskripsi</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Kode <span className="inline-block">&#8595;</span></th>
                    <th className="px-6 py-3 text-left font-extrabold border">Data Type</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Active</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Value</th>
                    <th className="px-6 py-3 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length > 0 ? (
                    datas.map((data,index) => (
                        <tr key={data.UUID_SETTING} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-6 py-4 border">{data.GS_NAME}</td>
                        <td className="px-6 py-4 border">{data.GS_DESC}</td>
                        <td className="px-6 py-4 border">{data.GS_CODE}</td>
                        <td className="px-6 py-4 border">{data.DATA_TYPE}</td>
                        <td className="px-6 py-4 border">{data.IS_ACTIVE === 1 ? "Yes" : "No"}</td>
                        <td className="px-6 py-4 border">{data.GS_VALUE}</td>
                        <td className="px-6 py-4 border text-center" >
                          <button                        
                          onClick= {() =>{
                            setIsEditModalOpened(true); 
                            setSelectedGenset(data);
                          }}>
                            <PencilSquareIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 border text-red-500 font-bold text-lg text-center">No Genset Found</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* LOAD MORE */}
            {isLoading && 
              <div className="flex items-center justify-center w-full bg-gray-100 p-1">
                <p>Loading Data...</p>
              </div>
            }

            {/* FILTER MODAL BOX */}
            {isFilterOpened && (
              <ModalFilterGenset 
              setAdvancedFilterData={setAdvancedFilterData}
              advancedFilterData={advancedFilterData}
              setIsFilterOpened={setIsFilterOpened}/>
            )}
            {/* EDiT MODAL BOX */}
            {isEditModalOpened && (
              <ModalEditGenset
              setIsEditModalOpened={setIsEditModalOpened}
              setSelectedGenset={setSelectedGenset}
              selectedGenset={selectedGenset}
              />
            )}
          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default GeneralSettings;
