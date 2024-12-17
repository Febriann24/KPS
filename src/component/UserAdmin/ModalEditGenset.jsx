import { useState, useEffect } from "react";
import axios from "axios";
function ModalEditGenset({ setIsEditModalOpened, setSelectedGenset, selectedGenset }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [dataType, setDataType] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setName(selectedGenset.GS_NAME);
    setDescription(selectedGenset.GS_DESC);
    setCode(selectedGenset.GS_CODE);
    setDataType(selectedGenset.DATA_TYPE);
    setValue(selectedGenset.GS_VALUE);

  }, [])

  const closeModal = () => {
    setIsEditModalOpened(false);
    setSelectedGenset(null);
  };

  const saveHandler = async () => {
    const reqbody = {
      GS_NAME: name,
      GS_DESC: description,
      GS_CODE: code,
      DATA_TYPE : dataType,
      GS_VALUE: value
    }

    const filteredReqBody = Object.fromEntries(
      Object.entries(reqbody).filter(([key, value]) => value !== "" && value !== null )
    )
    console.log(filteredReqBody);
    try{
      await axios.put(`http://localhost:5000/updateGenset/${selectedGenset.UUID_SETTING}`, filteredReqBody);
    }catch(e){
      console.log(e);
    }
    setIsEditModalOpened(false);
    setSelectedGenset(null);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h4 className="font-bold text-xl text-center">Update Setting</h4>
        <form className="my-4 space-y-4">
          <div className="flex flex-col">
            <label className="mx-2">Nama Setting</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 py-2 rounded-md px-3"
              placeholder="Enter Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mx-2">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-200 py-2 rounded-md px-3"
              placeholder="Enter Description"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="mx-2">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-200 py-2 rounded-md px-3"
              placeholder="Enter Code"
            />
          </div>

          <div className="flex flex-col">
            <label className="mx-2">Tipe Data</label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="border border-gray-200 py-2 rounded-md px-3"
            >
              <option value="">Select Data Type</option>
              <option value="INTEGER">Integer</option>
              <option value="BIG INTEGER">Big Integer</option>
              <option value="STRING">String</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mx-2">Nilai</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-gray-200 py-2 rounded-md px-3"
              placeholder="Enter Value"
            />
          </div>

          <div className="w-full bg-gray-100 h-[3px] my-5" />
        </form>

        <div className="flex flex-1 justify-end mt-8">
          <button
            className="bg-teal-500 text-white rounded-full py-2 mx-1 w-[130px] hover:bg-teal-400 transition-all duration-300"
            onClick={saveHandler}
          >
            Save
          </button>
          <button
            className="bg-red-700 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-red-600 transition-all duration-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditGenset;