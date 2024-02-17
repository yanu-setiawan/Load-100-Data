import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalCreate from "./ModalCreate";
import CardData from "./CardData";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/book");
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const toggleModalCreate = () => setModalCreateOpen(!isModalCreateOpen);

  return (
    <div className="w-full flex justify-center p-10">
      <div className="w-full flex flex-col max-w-7xl gap-4">
        <div className="flex gap-4">
          <button
            onClick={toggleModalCreate}
            className="btn btn-primary font-semibold text-white"
          >
            Create New Book
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Author</th>
                <th>Year</th>
                <th>Category</th>
                <th>Total page</th>
                <th>Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <CardData
                  key={idx}
                  idx={idx}
                  item={item}
                  handleSuccess={fetchingData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCreate
        isOpen={isModalCreateOpen}
        onClose={toggleModalCreate}
        onSuccess={fetchingData}
      />
    </div>
  );
}

export default App;
