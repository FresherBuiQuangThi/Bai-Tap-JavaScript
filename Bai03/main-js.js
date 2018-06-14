/**
 * Submit form ajax, check input and call ajax
 */
function submitFormAjax() {
	//check input validate if validate return ajax
	if (checkUsername() && checkPass() && checkEmail() && checkBirthday()) {
		console.log("submit");
		var uservalue = document.getElementById("username").value;
		//var pass = document.getElementById("password");

		//var url = "info_validation.php?username=" + username + "&pass=" + pass;
		var url = "info_validation.php?username=" + uservalue;
		xmlHttp = GetXmlHttpObject();
		if (xmlHttp === null) {
			alert("Trình duyệt của bạn không hỗ trợ HTTP Request");
			return;
		}
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log("SUCCESS" + this.responseText);

			} else {
				console.log("Http error " + this.status + ":" + this.statusText);
			}
		};
		xmlHttp.open("GET", url, true);
		xmlHttp.send();
	}
	return false;
}

/**
 * Check username 
 * if valid return true
 * else return false
 */
function checkUsername() {
	var usernameRegex = new RegExp("^[A-Za-z0-9]+$");
	var username = document.getElementById("username");
	if (username.value.length < 8) {
		document.getElementById("user_error").innerHTML = "Username length min 8 letter";
		return false;
	}
	if (usernameRegex.test(username.value)) {
		document.getElementById("user_error").innerHTML = "";
		return true;
	}
	document.getElementById("user_error").innerHTML = "Invalid Username";
	return false;
}

/**
 * Check password 
 * if valid return true
 * else return false
 */
function checkPass() {
	var pass = document.getElementById("password");
	if (pass.value.length >= 8) {
		document.getElementById("pass_error").innerHTML = "";
		return true;
	}
	document.getElementById("pass_error").innerHTML = "Password length min 8 letter";
	return false;
}

/**
 * Check email 
 * if valid return true
 * else return false
 */
function checkEmail() {
	var emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	var email = document.getElementById("email");
	if (emailRegex.test(email.value)) {
		document.getElementById("email_error").innerHTML = "";
		return true;
	}
	document.getElementById("email_error").innerHTML = "Email wrong format";
	return false;
}

/**
 * Check birthday 
 * if valid return true
 * else return false
 */
function checkBirthday() {
	var birthRegex = new RegExp("^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
	var birth = document.getElementById("datepicker");
	if (birthRegex.test(birth.value)) {
		document.getElementById("birth_error").innerHTML = "";
		return true;
	}
	document.getElementById("birth_error").innerHTML = "Birthday wrong format";
	return false;
}

/**
 * Reset form
 */
function resetForm() {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("email").value = "";
	document.getElementById("datepicker").value = "";

	document.getElementById("user_error").innerHTML = "";
	document.getElementById("pass_error").innerHTML = "";
	document.getElementById("email_error").innerHTML = "";
	document.getElementById("birth_error").innerHTML = "";
}

//FOR AJAX
function GetXmlHttpObject() {
	var xmlHttp = null;
	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}