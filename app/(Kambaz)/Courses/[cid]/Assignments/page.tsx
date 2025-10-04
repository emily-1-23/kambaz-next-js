import Link from 'next/link';
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      
      
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
          <button 
            id="wd-add-assignment" 
            className="btn btn-danger"
          >
            <BsPlus size={20} className="me-1" /> Assignment
          </button>
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
            <li className="list-group-item wd-assignment-list-item p-3 ps-1 d-flex">
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
                <a 
                  href="/Courses/1234/Assignments/123" 
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                >
                  A1 - ENV + HTML
                </a>
                <div className="text-muted small mt-1">
                  <span className="text-danger">Multiple modules</span> | <strong>not available until</strong> May 6 at 12:00 am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </li>
            </ul>

            <li className="list-group-item wd-assignment-list-item p-3 ps-1 d-flex">
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
                <a 
                  href="/Courses/1234/Assignments/123" 
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                >
                  A2 - CSS + BOOTSTRAP
                </a>
                <div className="text-muted small mt-1">
                  <span className="text-danger">Multiple modules</span> | <strong>not available until</strong> May 6 at 12:00 am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </li>

            <li className="list-group-item wd-assignment-list-item p-3 ps-1 d-flex">
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
                <a 
                  href="/Courses/1234/Assignments/123" 
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                >
                  A3 - JAVASCRIPT + REACT
                </a>
                <div className="text-muted small mt-1">
                  <span className="text-danger">Multiple modules</span> | <strong>not available until</strong> May 6 at 12:00 am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </li>
            
</li>

</ul>

    </div></div>
);}
