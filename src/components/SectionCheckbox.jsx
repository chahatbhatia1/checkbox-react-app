import React, { useCallback } from "react";
import StudentCheckbox from "./StudentCheckbox";

const SectionCheck = ({
	sectionId,
	sectionName,
	students,
	sectionChecked,
	handleSectionCheck,
	handleStudentCheck,
}) => {

	const handleCheck = useCallback((studentId) => {
		handleStudentCheck(studentId, sectionId);
	}, []);

	const handleSecCheck = useCallback((sectionId) => {
		handleSectionCheck(sectionId);
	}, []);

	return (
		<div className="section-container">
			<div className="section-tab">
				<input
					type="checkbox"
					name="section"
					checked={sectionChecked}
					onChange={() => handleSecCheck(sectionId)}
				/>
				<label>{sectionName}</label>
			</div>
			<div className="student-container">
				{students.map((student) => (
					<StudentCheckbox
						key={student.id}
						studentId={student.id}
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
