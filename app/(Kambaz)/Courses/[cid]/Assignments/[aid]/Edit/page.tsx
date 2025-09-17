export default function AssignmentEditor({ params }: any) {
  return (
    <div id="wd-assignment-editor">
      <h2>Assignment Editor</h2>
      <label>Assignment Name</label>
      <br />
      <input id="wd-assignment-name" defaultValue="A1 — HTML & Forms" />
      <br />
      <br />

      <label>Description</label>
      <br />
      <textarea
        id="wd-assignment-description"
        rows={4}
        cols={50}
        defaultValue="Build Lab1 & Kambaz prototype pages per Chapter 1."
      />
      <br />
      <br />

      <label>Points</label>
      <br />
      <input id="wd-assignment-points" type="number" defaultValue={100} />
      <br />
      <br />

      <label>Assignment Group</label>
      <br />
      <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
        <option value="ASSIGNMENTS">Assignments</option>
        <option value="QUIZZES">Quizzes</option>
        <option value="EXAMS">Exams</option>
        <option value="PROJECT">Project</option>
      </select>
      <br />
      <br />

      <label>Display Grade</label>
      <br />
      <select id="wd-assignment-display-grade" defaultValue="PERCENTAGE">
        <option value="PERCENTAGE">Percentage</option>
        <option value="POINTS">Points</option>
        <option value="COMPLETE">Complete/Incomplete</option>
      </select>
      <br />
      <br />

      <label>Submission Type</label>
      <br />
      <select id="wd-assignment-submission-type" defaultValue="ONLINE">
        <option value="ONLINE">Online</option>
        <option value="ON_PAPER">On Paper</option>
        <option value="EXTERNAL_TOOL">External Tool</option>
      </select>
      <br />
      <br />

      <fieldset>
        <legend>Online Entry Options</legend>
        <label>
          <input type="checkbox" defaultChecked /> Text Entry
        </label>
        <br />
        <label>
          <input type="checkbox" /> Website URL
        </label>
        <br />
        <label>
          <input type="checkbox" /> Media Recordings
        </label>
        <br />
        <label>
          <input type="checkbox" /> File Uploads
        </label>
      </fieldset>
      <br />

      <label>Assign to</label>
      <br />
      <input id="wd-assign-to" defaultValue="Everyone" />
      <br />
      <br />

      <label>Due</label>
      <br />
      <input id="wd-due-date" type="date" defaultValue="2025-09-24" />
      <br />
      <br />

      <label>Available from</label>
      <br />
      <input id="wd-available-from" type="date" defaultValue="2025-09-10" />
      <br />
      <br />

      <label>Until</label>
      <br />
      <input id="wd-available-until" type="date" defaultValue="2025-10-01" />
      <br />
      <br />
    </div>
  );
}
