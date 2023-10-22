import React, { useCallback } from "react";
import StudentCheckbox from "./StudentCheckbox";

const SectionCheck = ({
	sectionIndex,
	sectionName,
	students,
	sectionChecked,
	handleSectionCheck,
	handleStudentCheck,
}) => {

	const handleCheck = useCallback((studentIndex) => {
		handleStudentCheck(studentIndex, sectionIndex);
	}, []);

	const handleSecCheck = useCallback((sectionIndex) => {
		handleSectionCheck(sectionIndex);
	}, []);

	return (
		<div className="section-container">
			<div className="section-tab">
				<input
					type="checkbox"
					name="section"
					checked={sectionChecked}
					onChange={() => handleSecCheck(sectionIndex)}
				/>
				<label>{sectionName}</label>
			</div>
			<div className="student-container">
				{students.map((student, index) => (
					<StudentCheckbox
						key={student.id}
						studentIndex={index}
						studentName={student.name}
						studentChecked={student.checked}
						handleStudentCheck={handleCheck}
					/>
				))}
			</div>
		</div>
	);
};

const SectionCheckbox = React.memo(SectionCheck);

export default SectionCheckbox;
