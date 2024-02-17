import axios from "axios";
import React, { useEffect, useState } from "react";

function ModalCreate({ isOpen, onClose, onSuccess }) {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    author: "",
    year: "",
    category: "",
    total_page: "",
    price: "",
  });
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  const handleCreateBook = async () => {
    setLoading(true);
    try {
      const data = {
        name: form.name,
        author: form.author,
        year: form.year,
        category: form.category,
        total_page: parseInt(form.total_page),
        price: parseInt(form.price),
      };
      const result = await axios.post(
        "http://localhost:8080/book/create-book",
        data
      );
      console.log(result);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
  }, [isOpen]);

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
          <h3 className="font-bold text-lg mb-3">Tambah Data</h3>
          {isSuccess ? (
            <p>Create New Book is Successful</p>
          ) : (
            <div className="flex flex-col gap-2 mb-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChangeForm}
                placeholder="title book"
                className="input input-bordered"
              />
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={onChangeForm}
                placeholder="author"
                className="input input-bordered"
              />
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={onChangeForm}
                placeholder="release year"
                className="input input-bordered"
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={onChangeForm}
                placeholder="category"
                className="input input-bordered"
              />
              <input
                type="text"
                name="total_page"
                value={form.total_page}
                onChange={onChangeForm}
                placeholder="total page"
                className="input input-bordered"
              />
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={onChangeForm}
                placeholder="price book"
                className="input input-bordered"
              />
            </div>
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
                  onClick={onClose}
                  className="btn btn-error text-white min-w-[100px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBook}
                  className="btn btn-success text-white min-w-[100px]"
                >
                  {isLoading ? <label className="loading" /> : "Yes"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalCreate;
