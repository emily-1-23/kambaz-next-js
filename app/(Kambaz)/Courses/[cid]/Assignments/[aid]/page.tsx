/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { addAssignment, updateAssignment as updateAssignmentAction } from '../reducer';
import * as client from '../client';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const [assignment, setAssignment] = useState<any>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
  });

  useEffect(() => {
    if (aid !== 'new') {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [aid, assignments]);

  const handleSave = async () => {
    if (aid === 'new') {
      const newAssignment = await client.createAssignment(cid as string, assignment);
      dispatch(addAssignment(newAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment({ ...assignment, _id: aid });
      dispatch(updateAssignmentAction(updatedAssignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <label htmlFor="wd-name" className="form-label">Assignment Name</label>
      <input 
        id="wd-name" 
        className="form-control mb-3"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      <label htmlFor="wd-description" className="form-label">Description</label>
      <textarea 
        id="wd-description"
        className="form-control mb-3"
        rows={5}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />

      <div className="mb-3">
        <label htmlFor="wd-points" className="form-label">Points</label>
        <input 
          id="wd-points" 
          type="number"
          className="form-control"
          value={assignment.points}
          onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-due-date" className="form-label">Due Date</label>
        <input 
          type="date"
          id="wd-due-date"
          className="form-control"
          value={assignment.dueDate}
          onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-available-from" className="form-label">Available From</label>
        <input 
          type="date"
          id="wd-available-from"
          className="form-control"
          value={assignment.availableFrom}
          onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-available-until" className="form-label">Available Until</label>
        <input 
          type="date"
          id="wd-available-until"
          className="form-control"
          value={assignment.availableUntil}
          onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
        />
      </div>

      <div className="d-flex gap-2">
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
        <button 
          onClick={() => router.push(`/Courses/${cid}/Assignments`)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}