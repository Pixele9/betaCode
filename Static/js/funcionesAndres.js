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