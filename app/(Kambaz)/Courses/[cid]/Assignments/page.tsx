/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setAssignments, deleteAssignment as deleteAssignmentAction } from './reducer';
import * as client from './client';
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch, FaTrash } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

console.log("Current course ID:", cid); // ← Add this
  console.log("Assignments from state:", assignments);

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignmentAction(assignmentId));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: '300px' }}>
          <FaSearch 
            className="position-absolute text-muted" 
            style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px' }}
          />
          <input 
            placeholder="Search for Assignments" 
            id="wd-search-assignment"
            className="form-control ps-5"
            style={{ paddingLeft: '35px' }}
          />
        </div>
       
        <div className="d-flex gap-2">
          <button 
            id="wd-add-assignment-group" 
            className="btn btn-outline-secondary"
          >
            <BsPlus size={20} className="me-1" /> Group
          </button>
          <Link 
            href={`/Courses/${cid}/Assignments/new`}
            className="btn btn-danger"
            id="wd-add-assignment"
          >
            <BsPlus size={20} className="me-1" /> Assignment
          </Link>
        </div>
      </div>

      <ul className="list-group rounded-0" id="wd-assignment-list">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical size={24} className="me-2" />
              <strong>ASSIGNMENTS</strong>
              <span className="ms-2" style={{ fontSize: '0.8rem' }}>40% of Total</span>
            </div>
            <div>
              <button className="btn btn-outline-secondary btn-sm me-2">
                <BsPlus size={20} />
              </button>
            </div>
          </div>
          
          <ul className="list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li 
                key={assignment._id}
                className="list-group-item wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-start flex-grow-1">
                  <div 
                    className="me-3" 
                    style={{ 
                      borderLeft: '4px solid green', 
                      paddingLeft: '10px' 
                    }}
                  >
                    <BsGripVertical size={24} className="me-2 text-muted" />
                  </div>
                  <div className="flex-grow-1">
                    <Link 
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none fw-bold text-dark"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple modules</span> | 
                      <strong> not available until</strong> {assignment.availableFrom} | 
                      <strong> Due</strong> {assignment.dueDate} | 
                      {assignment.points} pts
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteAssignment(assignment._id);
                  }}
                  className="btn btn-danger btn-sm"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}