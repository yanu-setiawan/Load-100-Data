import React, { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

function CardData({ item, idx, handleSuccess }) {
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const toggleModalEdit = () => setModalEditOpen(!isModalEditOpen);

  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const toggleModalDelete = () => setModalDeleteOpen(!isModalDeleteOpen);

  return (
    <tr key={idx} className="hover text-sm">
      <th>{idx + 1}</th>
      <td>{item.name}</td>
      <td>{item.author}</td>
      <td>{item.year}</td>
      <td>{item.category}</td>
      <td>{item.total_page}</td>
      <td>{item.price}</td>
      <td>
        <div className="flex gap-2">
          <ModalEdit
            isOpen={isModalEditOpen}
            onClose={toggleModalEdit}
            data={item}
            onSuccess={handleSuccess}
          />
          <ModalDelete
            index={item.id}
            isOpen={isModalDeleteOpen}
            onClose={toggleModalDelete}
            onSuccess={handleSuccess}
          />
          <button
            onClick={toggleModalEdit}
            className="btn btn-success btn-md text-white"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={toggleModalDelete}
            className="btn btn-error btn-md text-white"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CardData;
