"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignments } from "../reducer";
import { RootState } from "../../../../store";
import * as client from "../client";

interface Assignment {
  _id?: string;
  course: string;
  title: string;
  description: string;
  points: number;
  availableDate: string;
  dueDate: string;
  availableUntil: string;
}

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const courseId = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  if (!courseId) throw new Error("Missing courseId in URL");
  const aid = Array.isArray(params.aid) ? params.aid[0] : params.aid;

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment = assignments.find(a => a._id === aid && a.course === courseId);

  const parseForInput = (dateStr: string | undefined, endOfDay = false) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = endOfDay ? "23" : "00";
    const min = endOfDay ? "59" : "00";
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const [form, setForm] = useState({
    title: existingAssignment?.title || "",
    description: existingAssignment?.description || "",
    points: existingAssignment?.points || 100,
    availableDate: parseForInput(existingAssignment?.availableDate),
    dueDate: parseForInput(existingAssignment?.dueDate, true),
    availableUntil: parseForInput(existingAssignment?.availableUntil, true),
  });

  useEffect(() => {
    if (existingAssignment) {
      setForm({
        title: existingAssignment.title,
        description: existingAssignment.description,
        points: existingAssignment.points,
        availableDate: parseForInput(existingAssignment.availableDate),
        dueDate: parseForInput(existingAssignment.dueDate, true),
        availableUntil: parseForInput(existingAssignment.availableUntil, true),
      });
    }
  }, [existingAssignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setForm(prev => ({ ...prev, [id]: type === "number" ? Number(value) : value }));
  };

  const handleSave = async () => {
    try {
      if (!form.title.trim()) {
        alert("Assignment title cannot be empty");
        return;
      }

      let savedAssignment;
      if (existingAssignment) {
        savedAssignment = await client.updateAssignment(existingAssignment._id, form);
      } else {
        savedAssignment = await client.createAssignment(courseId, form);
      }

      if (!savedAssignment) throw new Error("No data returned from server");

      if (existingAssignment) {
        const newAssignments = assignments.map(a => a._id === savedAssignment._id ? savedAssignment : a);
        dispatch(setAssignments(newAssignments));
      } else {
        dispatch(addAssignment(savedAssignment));
      }

      router.push(`/Courses/${courseId}/Assignments`);
    } catch (error: any) {
      console.error("Error saving assignment:", error?.response?.data || error.message);
      alert("There was a problem saving the assignment. Please try again.");
    }
  };

  const handleCancel = () => router.push(`/Courses/${courseId}/Assignments`);
  
  return (
    <div className="px-4 py-4" style={{ maxWidth: "800px", marginLeft: 0, textAlign: "left" }}>
      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">Assignment Name</label>
        <input id="title" value={form.title} onChange={handleChange} className="form-control" />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          id="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
        />
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="points" className="col-sm-3 col-form-label fw-bold">Points</label>
        <div className="col-sm-9">
          <input id="points" type="number" value={form.points} onChange={handleChange} className="form-control" />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="group" className="col-sm-3 col-form-label fw-bold">Assignment Group</label>
        <div className="col-sm-9">
          <select id="group" defaultValue="ASSIGNMENTS" className="form-select">
            <option>ASSIGNMENTS</option>
          </select>
        </div>
      </div>

      {/* Display Grade */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="display-grade" className="col-sm-3 col-form-label fw-bold">Display Grade as</label>
        <div className="col-sm-9">
          <select id="display-grade" defaultValue="Percentage" className="form-select">
            <option>Percentage</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3 align-items-start">
        <label className="col-sm-3 col-form-label fw-bold">Submission Type</label>
        <div className="col-sm-9">
          <div className="border p-3 rounded">
            <div className="mb-3">
              <select defaultValue="Online" className="form-select"><option>Online</option></select>
            </div>
            <div className="fw-bold mb-2">Online Entry Options</div>
            <div className="form-check mb-1"><input type="checkbox" className="form-check-input" /><label className="form-check-label">Text Entry</label></div>
            <div className="form-check mb-1"><input type="checkbox" className="form-check-input" defaultChecked /><label className="form-check-label">Website URL</label></div>
            <div className="form-check mb-1"><input type="checkbox" className="form-check-input" /><label className="form-check-label">Media Recordings</label></div>
            <div className="form-check mb-1"><input type="checkbox" className="form-check-input" /><label className="form-check-label">Student Annotation</label></div>
            <div className="form-check mb-1"><input type="checkbox" className="form-check-input" /><label className="form-check-label">File Uploads</label></div>
          </div>
        </div>
      </div>

      {/* Assign & Dates */}
      <div className="row mb-3 align-items-start">
        <label className="col-sm-3 col-form-label fw-bold">Assign</label>
        <div className="col-sm-9">
          <div className="border p-3 rounded">
            <div className="mb-3">
              <label className="form-label fw-bold">Assign to</label>
              <div className="form-control d-flex align-items-center flex-wrap" style={{ minHeight: '40px' }}>
                <span className="badge bg-secondary text-dark d-flex align-items-center me-1 mb-1">
                  Everyone
                  <button type="button" className="btn-close btn-close-black btn-sm ms-1" aria-label="Remove"></button>
                </span>
              </div>
            </div>

            {/* Dates */}
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label fw-bold">Due Date</label>
              <input type="datetime-local" id="dueDate" value={form.dueDate} onChange={handleChange} className="form-control" />
            </div>

            <div className="row g-3">
              <div className="col">
                <label htmlFor="availableDate" className="form-label fw-bold">Available from</label>
                <input type="datetime-local" id="availableDate" value={form.availableDate} onChange={handleChange} className="form-control" />
              </div>
              <div className="col">
                <label htmlFor="availableUntil" className="form-label fw-bold">Until</label>
                <input type="datetime-local" id="availableUntil" value={form.availableUntil} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-dark mt-4" />

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}