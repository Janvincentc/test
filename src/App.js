import React, { useState } from "react";
import useFetch from "./useFetch";
import "./App.css";

function App() {
  // Test 2
  const [search, setSearch] = useState("");
  const { data: users, loading } = useFetch(
    "https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json"
  );
  const { data: courses } = useFetch(
    "https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json"
  );
  const userKeys = ["name", "email", "phone"];
  const courseKeys = ["course_name", "course_selection", "semester"];

  const uniqueObj = courses?.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.course_name === value.course_name &&
          t.user_id === value.user_id &&
          t.course_selection === value.course_selection &&
          t.semester === value.semester
      )
  );

  let newData = [];
  users?.forEach((x) => {
    let id = x.id;
    let temp = {};
    uniqueObj?.forEach((y) => {
      if (y.user_id === id) {
        temp.push(y);
      }
    });
    newData.push({
      user: x,
      course: { ...temp },
    });
    return () => {
      newData();
    };
  });

  console.log(newData);

  if (loading) return <h1>LOADING...</h1>;
  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="Search something here...."
        className="search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div style={{ display: "flex" }} className="container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Course Name</th>
              <th>Course Selection</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {newData.map((item) => (
              <tr key={item.user.id}>
                <td>{item.user.name}</td>
                <td>{item.user.phone}</td>
                <td>{item.user.email}</td>
                <td aria-rowspan={2}>{item.course.course_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
