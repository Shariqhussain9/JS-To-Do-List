//Selectors
const home = document.querySelector('.list-home');
const allTask = document.querySelector('.list-allTask');
const completedTask = document.querySelector('.list-completedTask');

const mainContentForm = document.querySelector('.main-content__form');
const mainContentAllTaskTable = document.querySelector('.main-content__all_task');
const mainContentCompletedTaskTable = document.querySelector('.main-content__completed_task');

const timeInput = document.querySelector('.main-content__form_input-time');
const taskInput = document.querySelector('.main-content__form_input-task');

const submit = document.querySelector('.main-content__form-submit');

const allTaskTableBody = document.querySelector('.main-content__all_task-table_body');
const completedTaskTableBody = document.querySelector('.main-content__completed_task-table_body');

const logOut = document.querySelector('.logOut');

let checkBox;

let userName ;
//Events
home.addEventListener('click', () => { menuHandler(mainContentForm, mainContentAllTaskTable, mainContentCompletedTaskTable); menuActive(home, allTask, completedTask) });
allTask.addEventListener('click', () => { menuHandler(mainContentAllTaskTable, mainContentForm, mainContentCompletedTaskTable); menuActive(allTask, home, completedTask) });
completedTask.addEventListener('click', () => { menuHandler(mainContentCompletedTaskTable, mainContentForm, mainContentAllTaskTable); menuActive(completedTask, home, allTask) });

submit.addEventListener('click', () => submitHandler());

logOut.addEventListener('click', () => logOutHandler());

//global variable
let count;

//Handler
const menuActive = (active, hide1, hide2) => {
	active.classList.add('active');
	hide1.classList.remove('active');
	hide2.classList.remove('active');
}

const menuHandler = (menuActive, menuHide1, menuHide2) => {
	menuActive.classList.remove('hide');
	menuHide1.classList.add('hide');
	menuHide2.classList.add('hide');
}

const submitHandler = () => {
	const time = timeInput.value;
	const task = taskInput.value;

	const taskObj = {
		sNo: count,
		time,
		task,
		status: false
	}

	saveTask(taskObj);
	retrieveTask();
}

const checkBoxHandler = (checkBox) => {
	changeStatus(checkBox);
}

const logOutHandler = () => {
	localStorage.removeItem('sessionUser');
	location.replace('index.html');
}

//Helping functions
const saveTask = (task) => {
	const taskData = JSON.parse(localStorage.getItem(userName)) || [];
	taskData.push(task);

	localStorage.setItem(userName, JSON.stringify(taskData));

	clearInputs();
	count++;
}

const retrieveTask = () => {
	allTaskTableBody.innerHTML = '';
	completedTaskTableBody.innerHTML = '';

	let tableDataArray = JSON.parse(localStorage.getItem(userName));

	if (localStorage.getItem(userName) !== null) {
		tableDataArray.forEach(eachObj => {
				addRow(eachObj);
		});
	}

}

const changeStatus = (key) => {
	let tableDataArray = JSON.parse(localStorage.getItem(userName)) || [];

	tableDataArray.forEach(obj => {
		if (obj.sNo == key) {
			obj.status = !obj.status;
		}
	})

	localStorage.setItem(userName, JSON.stringify(tableDataArray));
	retrieveTask();
	getCheckBox();
}

const clearInputs = () => {
	timeInput.value = '';
	taskInput.value = '';
}

const addRow = (task) => {
	let checkStatus = task.status ? 'checked' : '';

	const trTemplate = `<tr class="table-row">
					<td>${task.sNo}</td>
					<td>${task.time}</td>
					<td>${task.task}</td>
					<td>
						<input type='checkbox' class='checkbox' id='${task.sNo}' ${checkStatus}/>
					</td>
				</tr>`;

	addTemplate(trTemplate);
	if (checkStatus) {
		addTemplateCompletedBody(trTemplate);
	}

}

const addTemplateCompletedBody = (trTemplate) => {
	completedTaskTableBody.innerHTML += trTemplate;
}

const addTemplate = (trTemplate) => {
	allTaskTableBody.innerHTML += trTemplate;
}

const getUserName = () => {
	if(!localStorage.getItem('sessionUser')){
		location.replace('index.html');
	} else {
		userName = localStorage.getItem('sessionUser');
	}
	console.log(localStorage.getItem('sessionUser'));

}

window.onload = () => {
	getUserName();
	if (localStorage.getItem(userName) !== null) {
		count = JSON.parse(localStorage.getItem(userName)).length + 1;
	}
	else {
		count = 1;
	}

	retrieveTask();
	getCheckBox();
}

const getCheckBox = () => {
	checkBox = document.querySelectorAll('.checkbox');
	for (let i = 0; i < checkBox.length; i++)
		checkBox[i].addEventListener('click', (e) => checkBoxHandler(e.target.id));
}