// Function para obtener el token
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {  
			var cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

function setupEditor() {
	// let editor = document.getElementById("editor")
	window.editor = ace.edit("editor");
	editor.setTheme("ace/theme/cobalt");
	editor.getSession().setMode("ace/mode/python");
	//   editor.getSession().setMode("ace/mode/python");
	editor.setValue(`def hello(name):
	print("Hello ",name)

hello("Andres")`,1); //1 = moves cursor to end

	editor.getSession().on('change', function() {
		// update();
	});

	editor.focus();


	editor.setOptions({
		fontSize: "16pt",
		showLineNumbers: true,
		showGutter: true, 
		vScrollBarAlwaysVisible:true,
		enableBasicAutocompletion: true, 
		enableLiveAutocompletion: true
	});

	editor.setShowPrintMargin(false);
	editor.setBehavioursEnabled(false);
}

// function ready() {
// }
setupEditor()
// update()

function compile() {
	let editor = document.getElementById("editor");
	code = editor.innerText;
	let numeroLineas = document.getElementsByClassName("ace_gutter-cell");
	numeroLineas = numeroLineas.length;
	numeroLineas=numeroLineas*2;
	code = code.substring(numeroLineas, code.length)
	console.log(code);

	let url = "http://192.168.0.101:8000/compiler";
	let token = getCookie('csrftoken');

	settings = {
		"lang": "Python3",
		"input": "",
		"code": code,
		"save": false
	}

	$.ajax({ 
		type: 'POST',
		url: url,
		data: {
			settings:JSON.stringify(settings), 
			csrfmiddlewaretoken: token,
			code2Compile: code
		},
		success: function(data){
			console.log("%c"+data, "font-size:30px;color:green;");
			// setTimeout(function(){ 
			// 	let console_out = document.getElementById("console-output")
			// 	console_out.innerText += data
			// 	alert("YA SE TUVO QUE ACTUALIZAR")
			//  }, 1000);
			let console_out = document.getElementById("console-output")
			console_out.innerText = data
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
		} 
	});
	
}