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
	window.editor = ace.edit("editor");
	editor.setTheme("ace/theme/cobalt");
	// editor.getSession().setMode("ace/mode/python");
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
		enableLiveAutocompletion: true,
	});

	editor.setShowPrintMargin(false);
	editor.setBehavioursEnabled(false);

	// let selector =  document.getElementById("lang-selection")
	// let lang = selector.options[selector.selectedIndex].value
	
	// console.log("LANG: " +lang)

	// switch(parseInt(lang)) {
	// 	case 1:
	// 		// Python3
	// 		editor.getSession().setMode("ace/mode/python");
	// 		alert("Cambio a PYTHON")
	// 		break;
	// 	case 2:
	// 		// JS
	// 		editor.getSession().setMode("ace/mode/javascript");
	// 		alert("Cambio a JS")
	// 		break;
	// 	case 3:
	// 		// Java
	// 		editor.getSession().setMode("ace/mode/java");
	// 		alert("Cambio a JAVA")
	// 		break;
	// 	case 4:
	// 		// C#
	// 		editor.getSession().setMode("ace/mode/csharp");
	// 		alert("Cambio a C#")
	// 		break;
	// 	default:
	// 		editor.getSession().setMode("ace/mode/python");
	// 		break;
	// }

}

// function ready() {
// }
setupEditor()
// update()

function compile() {
	let editorDiv = document.getElementById("editor");
	code = editorDiv.innerText;
	let numeroLineas = document.getElementsByClassName("ace_gutter-cell");
	numeroLineas = numeroLineas.length;
	numeroLineas=numeroLineas*2;
	code = code.substring(numeroLineas, code.length)
	console.log(code);

	// let url = "http://148.220.209.116:8000/compiler";
	let url = "http://192.168.1.89:8000/compiler";
	// let token = getCookie('csrftoken');
	let token = getCookie('csrfmiddlewaretoken');

	let selector =  document.getElementById("lang-selection")
	let lang = selector.options[selector.selectedIndex].value
	
	console.log("LANG: " +lang)

	switch(parseInt(lang)) {
		case 1:
			// Python3
			settings = {
				"lang": "Python3",
				"input": "",
				"code": code,
				"save": false
			}
			break;
		case 2:
			// JS
			settings = {
				"lang": "html/js",
				"input": "",
				"code": code,
				"save": false
			}
			break;
		case 3:
			// Java
			settings = {
				"lang": "Java",
				"input": "",
				"code": code,
				"save": false
			}
			break;
		case 4:
			// C#
			settings = {
				"lang": "Csharp",
				"input": "",
				"code": code,
				"save": false
			}
			break;
		default:
			settings = {
				"lang": "Python3",
				"input": "",
				"code": code,
				"save": false
			}
			break;
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
			// let console_out = document.getElementById("console-output")
			// console_out.innerText = data
			// $('.terminal').append('<p class="prompt">' + data + '</p><p class="prompt output new-output"></p>');
			resetOut(data)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			$('.terminal').append('<p class="prompt">' + errorThrown + '</p><p class="prompt output new-output"></p>');
		} 
	});
	
}



// TERMINAL

var inputReady = true;
var input = $('.404-input');
input.focus();
$('.container').on('click', function(e){
  input.focus();
});

input.on('keyup', function(e){
  $('.new-output').text(input.val());
  // console.log(inputReady);
});

$('.four-oh-four-form').on('submit', function(e){
  e.preventDefault();
  var val = $(this).children($('.404-input')).val().toLowerCase();
  var href;

	if (val === 'run'){
		compile()
  	}else {
		resetForm();
  	}
});

function resetForm(){
  var message = "Sorry that command is not recognized."
  var input = $('.404-input');

  $('.new-output').removeClass('new-output');
  input.val('');
  $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');

//   $('.new-output').velocity(
//     'scroll'
//   ), {duration: 100}
}

function resetOut(resp){
	var input = $('.404-input');
  
	$('.new-output').removeClass('new-output');
	input.val('');
	$('.terminal').append('<p class="prompt">' + resp + '</p><p class="prompt output new-output"></p>');
}
// END TERMINAL

function downloadCode() {

}