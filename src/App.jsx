import React, { useState } from "react";
import ClassCheckBox from "./components/ClassCheckbox";
import classes from "./constants";
import "./App.css";


export default function App() {
	const [classList, setClassList] = useState(classes);

	const handleClassCheck = (classIndex) => {
		let classListClone = [...classList];

		classListClone[classIndex].checked = !classListClone[classIndex].checked;
		classListClone[classIndex].sections = classListClone[classIndex]?.sections?.map((section) => {
			let students = section?.students?.map((student) => ({
				...student,
				checked: classListClone[classIndex].checked,
			}));

			return {
				...section,
				checked: classListClone[classIndex].checked,
				students,
			};
		});

		classListClone[classIndex] = classListClone[classIndex];
		setClassList([...classListClone]);
	};

	const handleSectionCheck = (sectionIndex, classIndex) => {
		let classListClone = [...classList];
		let sections = classListClone[classIndex]?.sections?.map((section, index) => {
			if (index === sectionIndex) {
				section.checked = !section.checked;
				let students = section?.students?.map((student) => ({
					...student,
					checked: section.checked,
				}));

				return {
					...section,
					students,
				};
			}
			return section;
		});

		classListClone = handleAllSectionsCheck(classListClone, classIndex);
		classListClone[classIndex].sections = sections;

		setClassList([...classListClone]);
	};

	const handleStudentCheck = (studentIndex, sectionIndex, classIndex) => {
		let classListClone = [...classList];
		let sections = classListClone[classIndex]?.sections;
		let students = sections[sectionIndex]?.students?.map((student, index) => {
			if (index === studentIndex) {
				return {
					...student,
					checked: !student.checked,
				};
			}
			return student;
		});

		const allStudentsChecked = students.every((student) => student.checked === true);

		sections[sectionIndex].students = students;
		sections[sectionIndex].checked = allStudentsChecked;

		classListClone[classIndex].sections = sections;

		classListClone = handleAllSectionsCheck(classListClone, classIndex);

		setClassList([...classListClone]);
	};

	const handleAllSectionsCheck = (classListClone, classIndex) => {
		let allSectionChecked = classListClone[classIndex]?.sections.every(
			(section) => section.checked === true
		);
		classListClone[classIndex].checked = allSectionChecked;

		return classListClone;
	};

	return (
		<div className="App">
			<h1>Checkbox React App</h1>
			{classList?.map((classObj, classIndex) => (
				<ClassCheckBox
					key={classObj.id}
					classObjName={classObj.name}
					sections={classObj.sections}
					isClassChecked={classObj.checked}
					handleClassCheck={() => handleClassCheck(classIndex)}
					handleSectionCheck={(sectionIndex) =>
						handleSectionCheck(sectionIndex, classIndex)
					}
					handleStudentCheck={(studentIndex, sectionIndex) =>
						handleStudentCheck(studentIndex, sectionIndex, classIndex)
					}
				/>
			))}
		</div>
	);
}
