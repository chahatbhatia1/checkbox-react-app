import React, {useCallback} from "react";
import SectionCheckbox from "./SectionCheckbox";

const ClassCheckBox = ({
	clsName,
	sections,
	classChecked,
	handleClassCheck,
	handleSectionCheck,
	handleStudentCheck,
}) => {

	const handleSecCheck = useCallback((sectionId) => {
		handleSectionCheck(sectionId);
	}, []);

	const handleStdCheck = useCallback((studentId, sectionId) => {
		handleStudentCheck(studentId, sectionId);
	}, []);

	return (
		<div className="class-container">
			<div className="class-tab">
				<input
					type="checkbox"
					name="class"
					checked={classChecked}
					onChange={handleClassCheck}
				/>
				<label>{clsName}</label>
			</div>
			<div className="section-container">
				{sections.map((section) => (
					<SectionCheckbox
						key={section.id}
						sectionId={section.id}
						sectionName={section.name}
						students={section.students}
						sectionChecked={section.checked}
						handleSectionCheck={handleSecCheck}
						handleStudentCheck={handleStdCheck}
					/>
				))}
			</div>
		</div>
	);
};

export default ClassCheckBox;
