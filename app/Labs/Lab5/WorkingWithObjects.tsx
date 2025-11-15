'use client'
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "Introduction to Programming",
    description: "Learn the basics of programming with JavaScript",
    course: "Computer Science"
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

<h3>Working With Module Object</h3>
      
      <h4>Retrieving Module</h4>
      <a id="wd-retrieve-module" 
         className="btn btn-primary me-2"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <hr/>
      
      <h4>Retrieving Module Name</h4>
      <a id="wd-retrieve-module-name" 
         className="btn btn-primary"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <hr/>

<h4>Modifying Module Properties</h4>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl 
        className="w-75" 
        id="wd-module-name"
        defaultValue={module.name} 
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <hr />


    </div>
);}
