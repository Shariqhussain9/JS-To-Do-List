//Selector
const signUpForm = document.querySelector('.signUp');
const logInForm = document.querySelector('.logIn');

const userNameInput = document.querySelector('.signUp-userName');
const passwordInput = document.querySelector('.signUp-password');
const confirmPasswordInput = document.querySelector('.signUp-confirmPassword');

const userNameLogIn = document.querySelector('.logIn-userName');
const passwordLogIn = document.querySelector('.logIn-password');

const submitSignUp = document.querySelector('.signUp-div__button');
const submitLogIn = document.querySelector('.logIn-div__button');

//Event 
userNameInput.addEventListener('change', () => checkUserName());
passwordInput.addEventListener('change', () => checkPassword());
confirmPasswordInput.addEventListener('change', () => checkConfirmPassword());

submitSignUp.addEventListener('click', () => submitSignUpHandler());
submitLogIn.addEventListener('click', () => submitLogInHandler());

//Handler
const submitSignUpHandler = () => {
	let userName = userNameInput.value;
	let password = passwordInput.value;

	const user = {
		userName,
		password
	}
	if(userName !== '' && password !== ''){
		addUser(user);
		signUpForm.classList.add('hide');
		logInForm.classList.remove('hide');
		clearInputs();
	}
}

const submitLogInHandler = () => {
	let userName = userNameLogIn.value;
	let password = passwordLogIn.value;

	let value = parseLocalStorage(userName, password);

	if (0 === value) {
		showError(userNameLogIn,"No user found with this User Name.");
	} else if (1 === value) {
		console.log("Sucessfull Login.");
		localStorage.setItem('sessionUser',userName);
		location.replace("main.html");
	} else if (-1 === value) {
		showError(passwordLogIn, "Invalid Password.");
	} else {
		showError(passwordLogIn, "Please SignUp.");
	}
}

//UserName Verification
const checkUserName = () => {
	let userName = userNameInput.value;

	if (userName.length > 0) {
		let flag = false;
		if (localStorage.getItem('users')) {
			JSON.parse(localStorage.getItem('users')).forEach(element => {
				if (element.userName == userName) {
					showError(userNameInput, "UserName already taken");
					flag = true;
				}
			});
			if (!flag) {
				showSuccess(userNameInput);
			}
		}
	} else {
		showError(userNameInput, "Please Enter valid UserName");
	}
}

//Password Verification
const checkPassword = () => {
	let password = passwordInput.value;

	if (password.length > 0) {
		if (password.length < 8) {
			showError(passwordInput, "Password must be atleast 8 characters long.");
		} else if (!containsUpperCase(password)) {
			showError(passwordInput, "Password must have atleast 1 capital letter.");
		} else if (!containsNumber(password)) {
			showError(passwordInput, "Password must contain atleat 1 number.");
		} else {
			showSuccess(passwordInput);
		}
		checkConfirmPassword();
	} else {
		showError(passwordInput, "Please enter valid password.");
	}
}

//confirm Password Verification
const checkConfirmPassword = () => {
	let confirmPassword = confirmPasswordInput.value;
	let password = passwordInput.value;
	if (confirmPassword.length > 0) {
		if (password === confirmPassword) {
			showSuccess(confirmPasswordInput);
		} else {
			showError(confirmPasswordInput, "Password doesnot match with above.");
		}
	} else {
		showError(confirmPasswordInput, "Confirm Password is invalid");
	}
}

const showSuccess = (input) => {
	input.classList.remove('error');
	input.classList.add('success');
	
	submitSignUp.disabled = false;
	let field = input.parentElement;
	let error = field.querySelector('.errors');
	error.innerHTML = '';
}

const showError = (input, message) => {
	input.classList.add('error');
	input.classList.remove('success');

	submitSignUp.disabled = true;
	let field = input.parentElement;
	let error = field.querySelector('.errors');
	error.innerHTML = message;
}

//Helpers
const containsUpperCase = (input) => {
	return /[A-Z]/.test(input);
}

const containsNumber = (input) => {
	return /\d/.test(input);
}

const addUser = (user) => {
	let userArray = JSON.parse(localStorage.getItem('users')) || [];
	userArray.push(user);

	localStorage.setItem('users', JSON.stringify(userArray));
}

const clearInputs = () => {
	userNameInput.value = "";
	passwordInput.value = "";
	confirmPasswordInput.value = "";
	userNameLogIn.value = "";
	passwordLogIn.value = "";
}

const parseLocalStorage = (userName, password) => {
	let flag = 0;
	if (localStorage.getItem('users')) {
		let userDetail = JSON.parse(localStorage.getItem('users'));

		for (let i = 0; i < userDetail.length; i++) {
			if (userDetail[i].userName === userName) {
				flag = -1;
				if (userDetail[i].userName === userName && userDetail[i].password === password) {
					flag = 1;
				}
			}
		}
		return flag;
	} else {
		return false;
	}
}

