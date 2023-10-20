import React from "react";

const StudentCheck = ({ 
	studentId,
	studentName,
	studentChecked,
	handleStudentCheck 
}) => {

	console.log("student rendered");

	return (
		<div className="student-tab">
			<input
				type="checkbox"
				name="student"
				checked={studentChecked}
				onChange={() => handleStudentCheck(studentId)}
			/>
			<label>{studentName}</label>
		</div>
	);
};

const StudentCheckbox = React.memo(StudentCheck);

export default StudentCheckbox;
