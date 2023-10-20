import React, { useCallback, useState } from "react";
import ClassCheckBox from "./components/ClassCheckbox";
import "./App.css";

const classes = [
	{
		id: "class-9",
		name: "Class 9",
		checked: false,
		sections: [
			{
				id: "sec-a",
				name: "Section A",
				checked: false,
				students: [
					{
						id: "s-1",
						name: "Student 1",
						checked: false,
					},
					{
						id: "s-2",
						name: "Student 2",
						checked: false,
					},
					{
						id: "s-3",
						name: "Student 3",
						checked: false,
					},
				],
			},
			{
				id: "sec-b",
				name: "Section B",
				checked: false,
				students: [
					{
						id: "s-4",
						name: "Student 4",
						checked: false,
					},
					{
						id: "s-5",
						name: "Student 5",
						checked: false,
					},
					{
						id: "s-6",
						name: "Student 6",
						checked: false,
					},
				],
			},
			{
				id: "sec-c",
				name: "Section C",
				checked: false,
				students: [
					{
						id: "s-7",
						name: "Student 7",
						checked: false,
					},
					{
						id: "s-8",
						name: "Student 8",
						checked: false,
					},
					{
						id: "s-9",
						name: "Student 9",
						checked: false,
					},
				],
			},
		],
	},
];

export default function App() {
	const [data, setData] = useState(classes);

	const handleClassCheck = (classId) => {
		let dataClone = [...data];
		let targetClass = dataClone.find((cls) => cls.id === classId);
		let classIndex = dataClone.findIndex((cls) => cls.id === classId);

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

	const handleSectionCheck = (sectionId, classId) => {
		let dataClone = [...data];
		let classIndex = dataClone.findIndex((cls) => cls.id === classId);
		let sections = dataClone[classIndex].sections.map((section) => {
			if (section.id === sectionId) {
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

	const handleStudentCheck = (studentId, sectionId, classId) => {
		let dataClone = [...data];
		let classIndex = dataClone.findIndex((cls) => cls.id === classId);
		let sections = dataClone[classIndex].sections;
		let sectionIndex = sections.findIndex((sec) => sec.id === sectionId);
		let students = sections[sectionIndex].students.map((std) => {
			if (std.id === studentId) {
				return {
					...std,
					checked: !std.checked,
				};
			}
			return std;
		});

		let allStudentsChecked = students.every((std) => std.checked === true);

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
			{data.map((cls) => (
				<ClassCheckBox
					key={cls.id}
					clsName={cls.name}
					sections={cls.sections}
					classChecked={cls.checked}
					handleClassCheck={() => handleClassCheck(cls.id)}
					handleSectionCheck={(sectionId) =>
						handleSectionCheck(sectionId, cls.id)
					}
					handleStudentCheck={(studentId, sectionId) =>
						handleStudentCheck(studentId, sectionId, cls.id)
					}
				/>
			))}
		</div>
	);
}
