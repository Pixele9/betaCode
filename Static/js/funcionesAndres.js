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

	let selector =  document.getElementById("lang-selection")
	let lang = selector.options[selector.selectedIndex].value

	// let url = "http://148.220.209.116:8000/compiler";
	let url = "http://192.168.1.89:8000/compiler";
	// let token = getCookie('csrftoken');
	let token = getCookie('csrfmiddlewaretoken');
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
				"lang": "Java",
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
		// showKittens();
		compile()
  	}else {
		resetForm();
  	}
});

function resetForm(withKittens){
  var message = "Sorry that command is not recognized."
  var input = $('.404-input');

  if (withKittens){
    $('.kittens').removeClass('kittens');
    message = "Huzzzzzah Kittehs!"
  }

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

	function showKittens(){
		$('.terminal').append("<div class='kittens'>"+
								 "<p class='prompt'>	                             ,----,         ,----,                                          ,---,</p>" +
								 "<p class='prompt'>       ,--.                ,/   .`|       ,/   .`|                     ,--.              ,`--.' |</p>" +
								 "<p class='prompt'>   ,--/  /|    ,---,     ,`   .'  :     ,`   .'  :     ,---,.        ,--.'|   .--.--.    |   :  :</p>" +
								 "<p class='prompt'>,---,': / ' ,`--.' |   ;    ;     /   ;    ;     /   ,'  .' |    ,--,:  : |  /  /    '.  '   '  ;</p>" +
								 "<p class='prompt'>:   : '/ /  |   :  : .'___,/    ,'  .'___,/    ,'  ,---.'   | ,`--.'`|  ' : |  :  /`. /  |   |  |</p>" +
								 "<p class='prompt'>|   '   ,   :   |  ' |    :     |   |    :     |   |   |   .' |   :  :  | | ;  |  |--`   '   :  ;</p>" +
								 "<p class='prompt'>'   |  /    |   :  | ;    |.';  ;   ;    |.';  ;   :   :  |-, :   |   \\ | : |  :  ;_     |   |  '</p>" +
								 "<p class='prompt'>|   ;  ;    '   '  ; `----'  |  |   `----'  |  |   :   |  ;/| |   : '  '; |  \\  \\    `.  '   :  |</p>" +
								 "<p class='prompt'>:   '   \\   |   |  |     '   :  ;       '   :  ;   |   :   .' '   ' ;.    ;   `----.   \\ ;   |  ;</p>" +
								 "<p class='prompt'>'   : |.  \\ |   |  '     '   :  |       '   :  |   '   :  ;/| '   : |  ; .'  /  /`--'  /  `--..`;  </p>" +
								 "<p class='prompt'>|   | '_\\.' '   :  |     ;   |.'        ;   |.'    |   |    \\ |   | '`--'   '--'.     /  .--,_   </p>" +
								 "<p class='prompt'>'   : |     ;   |.'      '---'          '---'      |   :   .' '   : |         `--'---'   |    |`.  </p>" +
								 "<p class='prompt'>;   |,'     '---'                                  |   | ,'   ;   |.'                    `-- -`, ; </p>" +
								 "<p class='prompt'>'---'                                              `----'     '---'                        '---`'</p>" +
								 "<p class='prompt'>                                                              </p></div>");

		
		var lines = $('.kittens p');
		$.each(lines, function(index, line){
			setTimeout(function(){
				$(line).css({
					"opacity": 1
				});

				textEffect($(line))
			}, index * 100);
		});

		$('.new-output').velocity(
			'scroll'
		), {duration: 100}

		setTimeout(function(){
			var gif;

			$.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kittens', function(result){
				gif = result.data.image_url;
				$('.terminal').append('<img class="kitten-gif" src="' + gif + '"">');
				resetForm(true);
			});
		}, (lines.length * 100) + 1000);
	}

	function textEffect(line){
		var alpha = [';', '.', ',', ':', ';', '~', '`'];
		var animationSpeed = 10;
		var index = 0;
		var string = line.text();
		var splitString = string.split("");
		var copyString = splitString.slice(0);

		var emptyString = copyString.map(function(el){
		    return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
		})

		emptyString = shuffle(emptyString);

		$.each(copyString, function(i, el){
		    var newChar = emptyString[i];
		    toUnderscore(copyString, line, newChar);

		    setTimeout(function(){
		      fromUnderscore(copyString, splitString, newChar, line);
		    },i * animationSpeed);
		  })
	}

	function toUnderscore(copyString, line, newChar){
		copyString[newChar[1]] = newChar[0];
		line.text(copyString.join(''));
	}

	function fromUnderscore(copyString, splitString, newChar, line){
		copyString[newChar[1]] = splitString[newChar[1]];
		line.text(copyString.join(""));
	}


	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

// END TERMINAL