import React, { useState } from "react";
import ClassCheckBox from "./components/ClassCheckbox";
import classes from "./constants";
import "./App.css";


export default function App() {
	const [data, setData] = useState(classes);

	const handleClassCheck = (classIndex) => {
		let dataClone = [...data];
		let targetClass = dataClone[classIndex];

		targetClass.checked = !targetClass.checked;
		targetClass.sections = targetClass.sections.map((section) => {
			let students = section.students.map((student) => ({
				...student,
				checked: targetClass.checked,
			}));

			return {
				...section,
				checked: targetClass.checked,
				students,
			};
		});

		dataClone[classIndex] = targetClass;
		setData([...dataClone]);
	};

	const handleSectionCheck = (sectionIndex, classIndex) => {
		let dataClone = [...data];
		let sections = dataClone[classIndex].sections.map((section, index) => {
			if (index === sectionIndex) {
				section.checked = !section.checked;
				let students = section.students.map((student) => ({
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

		dataClone = handleAllSectionsCheck(dataClone, classIndex);
		dataClone[classIndex].sections = sections;

		setData([...dataClone]);
	};

	const handleStudentCheck = (studentIndex, sectionIndex, classIndex) => {
		let dataClone = [...data];
		let sections = dataClone[classIndex].sections;
		let students = sections[sectionIndex].students.map((student, index) => {
			if (index === studentIndex) {
				return {
					...student,
					checked: !student.checked,
				};
			}
			return student;
		});

		let allStudentsChecked = students.every((student) => student.checked === true);

		sections[sectionIndex].students = students;
		sections[sectionIndex].checked = allStudentsChecked;

		dataClone[classIndex].sections = sections;

		dataClone = handleAllSectionsCheck(dataClone, classIndex);

		setData([...dataClone]);
	};

	const handleAllSectionsCheck = (dataClone, classIndex) => {
		let allSectionChecked = dataClone[classIndex].sections.every(
			(section) => section.checked === true
		);
		dataClone[classIndex].checked = allSectionChecked;

		return dataClone;
	};

	return (
		<div className="App">
			<h1>Checkbox React App</h1>
			{data.map((classObj, classIndex) => (
				<ClassCheckBox
					key={classObj.id}
					classObjName={classObj.name}
					sections={classObj.sections}
					classChecked={classObj.checked}
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
