export default function PeopleTable() {
  const users = [
    {
      firstName: "Tony",
      lastName: "Stark",
      loginId: "001234561S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-01",
      totalActivity: "10:21:32",
    },
    {
      firstName: "Bruce",
      lastName: "Wayne",
      loginId: "001234562W",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-02",
      totalActivity: "09:15:45",
    },
    {
      firstName: "Steve",
      lastName: "Rogers",
      loginId: "001234563R",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-03",
      totalActivity: "11:45:20",
    },
    {
      firstName: "Natasha",
      lastName: "Romanoff",
      loginId: "001234564R",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-04",
      totalActivity: "08:30:15",
    },
  ];

  return (
    <div id="wd-people-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="wd-full-name text-nowrap">
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
