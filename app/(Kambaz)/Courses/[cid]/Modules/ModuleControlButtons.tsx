import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  isFaculty = false,
}: {
  moduleId: string;
  deleteModule?: (moduleId: string) => void;
  editModule?: (moduleId: string) => void;
  isFaculty?: boolean;
}) {
  return (
    <div className="float-end">
      {/* Only FACULTY see edit & delete buttons */}
      {isFaculty && (
        <>
          <FaPencil
            onClick={() => editModule && editModule(moduleId)}
            className="text-primary me-2"
            style={{ cursor: "pointer" }}
          />
          <FaTrash
            className="text-danger me-2"
            onClick={() => deleteModule && deleteModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      {/* Everyone still sees these icons */}
      <GreenCheckmark />
      <BsPlus className="fs-1 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );  
}