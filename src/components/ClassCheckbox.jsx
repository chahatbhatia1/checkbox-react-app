import React, {useCallback} from "react";
import SectionCheckbox from "./SectionCheckbox";

const ClassCheckBox = ({
	classObjName,
	sections,
	isClassChecked,
	handleClassCheck,
	handleSectionCheck,
	handleStudentCheck,
}) => {

	const handleSecCheck = useCallback((sectionIndex) => {
		handleSectionCheck(sectionIndex);
	}, []);

	const handleStdCheck = useCallback((studentIndex, sectionIndex) => {
		handleStudentCheck(studentIndex, sectionIndex);
	}, []);

	return (
		<div className="class-container">
			<div className="class-tab">
				<input
					type="checkbox"
					name="class"
					checked={isClassChecked}
					onChange={handleClassCheck}
				/>
				<label>{classObjName}</label>
			</div>
			<div className="section-container">
				{sections?.map((section, index) => (
					<SectionCheckbox
						key={section.id}
						sectionIndex={index}
						sectionName={section.name}
						students={section.students}
						isSectionChecked={section.checked}
						handleSectionCheck={handleSecCheck}
						handleStudentCheck={handleStdCheck}
					/>
				))}
			</div>
		</div>
	);
};

export default ClassCheckBox;
