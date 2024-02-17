import axios from "axios";
import React, { useState } from "react";

function ModalDelete({ index, isOpen, onClose, onSuccess }) {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const result = await axios.delete(`http://localhost:8080/book/${id}`);
      console.log(result);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        checked={isOpen}
        onChange={onClose}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Hapus Data</h3>
          {isSuccess ? (
            <p className="py-4">Delete Success!</p>
          ) : (
            <p className="py-4">Apakah anda yakin akan menghapus ?</p>
          )}
          <div className="flex justify-end gap-4">
            {isSuccess ? (
              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="btn btn-success text-white min-w-[100px]"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-success text-white min-w-[100px]"
                >
                  {isLoading ? <label className="loading" /> : "Yes"}
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-error text-white min-w-[100px]"
                >
                  Batal
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelete;
