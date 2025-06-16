import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StudentTable = ({ students, handleEdit, handleDelete }) => {
  const calculateResults = (student) => {
    const marks = [student.mark1, student.mark2, student.mark3, student.mark4, student.mark5];
    const totalMarks = marks.reduce((sum, mark) => sum + parseInt(mark || 0), 0);
    const percentage = (totalMarks / 500) * 100;
    
    let division;
    if (percentage >= 80) division = 'First';
    else if (percentage >= 60) division = 'Second';
    else if (percentage >= 40) division = 'Third';
    else division = 'Fail';
    
    return { percentage: percentage.toFixed(2), division };
  };

  return (
    <div className="table-container">
      <h2 className="form-title">Student Records</h2>
      {students.length === 0 ? (
        <p>No student records found. Add some using the form.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              {[1, 2, 3, 4, 5].map((num) => (
                <th key={`mark${num}`}>Mark {num}</th>
              ))}
              <th>Percentage</th>
              <th>Division</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const { percentage, division } = calculateResults(student);
              const divisionClass = `division-${division.toLowerCase()}`;
              
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <td key={`mark${num}`}>{student[`mark${num}`]}</td>
                  ))}
                  <td>{percentage}%</td>
                  <td className={divisionClass}>{division}</td>
                  <td>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;