export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        {/* Complete on your own */}

        <br /><br />

        <label  htmlFor="wd-group"> Assignment groups </label>
        <select id="wd-group">
            <option value="Individual">Individual</option>
            <option value="projects">projects</option>
            <option selected value="assignments">assignments</option>
            <option value="responses">responses</option>
        </select>

        <br /><br />

        <label  htmlFor="wd-display-grade-as"> Display grades as </label>
        <select id="wd-display-grade-as">
            <option selected value="Percentages">Percentages</option>
            <option value="Fractions">Fractions</option>
        </select>
        
        <br /><br />

        <label  htmlFor="wd-submission-type"> Submission type </label>
        <select id="wd-submission-type">
            <option selected value="Online">Online</option>
            <option value="Paper">Paper</option>
        </select>

        <br /><br />

        <label>Online Entry Options</label><br/>

        <input type="checkbox" name="check-genre" id="wd-text-entry"/>
        <label htmlFor="wd-text-entry">Text Entry</label><br/>

        <input type="checkbox" name="check-genre" id="wd-website-url"/>
        <label htmlFor="wd-website-url">Website URLs</label><br/>

        <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

        <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

        <input type="checkbox" name="check-genre" id="wd-file-upload"/>
        <label htmlFor="wd-file-upload">File Uploads</label><br/>

        <br /><br />

        <label htmlFor="wd-assign-to">Assign to:</label>
    <input placeholder="everyone" id="wd-assign-to" /> <br />

    <br /><br />

    <label htmlFor="wd-due-date"> Due Date: </label>
    <input type="date"
       defaultValue="2024-01-21"
       id="wd-due-date"/><br/>

       <br /><br />

<label htmlFor="wd-available-from"> Available from </label>
    <input type="date"
       defaultValue="2024-01-21"
       id="wd-available-from"/>

<label htmlFor="wd-available-until"> until: </label>
    <input type="date"
       defaultValue="2024-01-31"
       id="wd-available-until"/><br/>

      </table>
    </div>

    
);}

