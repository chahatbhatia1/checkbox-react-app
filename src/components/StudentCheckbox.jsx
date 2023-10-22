import React from "react";

const StudentCheck = ({ 
	studentIndex,
	studentName,
	studentChecked,
	handleStudentCheck 
}) => {

	return (
		<div className="student-tab">
			<input
				type="checkbox"
				name="student"
				checked={studentChecked}
				onChange={() => handleStudentCheck(studentIndex)}
			/>
			<label>{studentName}</label>
		</div>
	);
};

const StudentCheckbox = React.memo(StudentCheck);

export default StudentCheckbox;
