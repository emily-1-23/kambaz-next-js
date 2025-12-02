/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import * as client from "../Assignments/client";
import { setAssignments } from "../Assignments/reducer";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, Button, FormControl, Modal } from "react-bootstrap";
import { BsGripVertical, BsPlus, BsTrash } from "react-icons/bs";
import { FaSearch, FaCheckCircle, FaCircle, FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import "../../../styles.css";
import { RootState } from "../../../store";

// --- Helper to format ISO date strings ---
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedDate} at ${hours}:${minutes}${ampm}`;
}

// --- Green Checkmark icon ---
function GreenCheckmark() {
  return (
    <span className="position-relative d-inline-block me-2" style={{ width: "20px", height: "20px" }}>
      <FaCircle className="text-white fs-6 position-absolute top-0 start-0" />
      <FaCheckCircle className="text-success fs-5 position-absolute top-0 start-0" />
    </span>
  );
}

// --- Assignment group header buttons ---
function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex justify-content-center align-items-center me-3 px-3 py-2 rounded-pill border bg-light text-dark small">
        40% of Total
      </div>
      <BsPlus className="fs-4 me-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

// --- Buttons for individual assignments ---
function LessonControlButtons({ onDelete, isFaculty }: { onDelete: () => void; isFaculty: boolean }) {
  return (
    <div className="d-flex align-items-center float-end">
      <GreenCheckmark />
      {isFaculty && (
        <BsTrash className="text-danger fs-5 mx-3" role="button" onClick={onDelete} />
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

export default function Assignments() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const courseId = params.cid as string;

  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  // Redux
  const assignments = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.filter((a: any) => a.course === courseId)
  );

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as { role: string } | null;

  // --- CRUD Operations ---
  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(courseId);
    dispatch(setAssignments(data));
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    fetchAssignments(); // refetch from DB
  };

  useEffect(() => {
    if (courseId) fetchAssignments();
  }, [courseId]);

  const handleDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) onRemoveAssignment(selectedAssignment._id);
    setShowModal(false);
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Search bar and top buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center border rounded px-3 py-2 me-3" style={{ maxWidth: "300px" }}>
          <FaSearch className="me-2 text-muted" />
          <FormControl placeholder="Search..." className="border-0 shadow-none p-0" />
        </div>
        <div className="d-flex align-items-center">
          <Button
            className="me-2 d-flex align-items-center btn-secondary"
            onClick={() => currentUser?.role === "FACULTY" && router.push(`/Courses/${courseId}/Assignments/new-group`)}
          >
            <BsPlus className="me-1 fs-5" /> Group
          </Button>
          <Button
            variant="danger"
            className="text-white d-flex align-items-center"
            onClick={() => currentUser?.role === "FACULTY" && router.push(`/Courses/${courseId}/Assignments/new`)}
          >
            <BsPlus className="me-1 fs-5" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center px-3 py-3 rounded bg-light border-bottom border-dark">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span className="fw-bold fs-6">ASSIGNMENTS</span>
            </span>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0 mt-0">
            {assignments.map((item: any, idx: number) => (
              <ListGroupItem
                key={idx}
                className="wd-lesson d-flex justify-content-between align-items-start px-3 py-3"
                style={{ borderLeft: "3px solid green" }}
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-3 fs-4 text-secondary mt-1" />
                  <MdOutlineAssignment className="me-3 text-success fs-5 mt-1" />
                  <div>
                    <div
                      className="fw-bold mb-1 d-block text-decoration-none text-dark"
                      style={{ cursor: currentUser?.role === "FACULTY" ? "pointer" : "default" }}
                      onClick={() => currentUser?.role === "FACULTY" && router.push(`/Courses/${courseId}/Assignments/${item._id}`)}
                    >
                      {item.title}
                    </div>
                    <div className="small text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <span className="text-dark">
                        <b>Not available until</b> {formatDate(item.availableDate)}
                      </span>
                      <br />
                      <span className="text-dark">
                        <b>Due</b> {formatDate(item.dueDate)} | {item.points} pts
                      </span>
                    </div>
                  </div>
                </div>
                <LessonControlButtons
                  onDelete={() => handleDelete(item)}
                  isFaculty={currentUser?.role === "FACULTY"}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      {/* Delete confirmation modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedAssignment?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}