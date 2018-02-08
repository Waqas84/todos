$(document).ready(function() {
	$.getJSON("/api/todos").then(addTodos);

	$("#todoInput").keypress(function(event) {
		if (event.which == 13) {
			createTodo();
		}
	});
});

function addTodos(todos) {
	todos.forEach(function(todo) {
		addTodo(todo);
	});
}

function createTodo() {
	let userInput = $("#todoInput").val();
	console.log(userInput);
	$.post("/api/todos", { name: userInput })
		.then(function(newTodo) {
			addTodo(newTodo);
			$("#todoInput").val('')

		})
		.catch(function(err) {
			console.log(err);
		});
}

function addTodo(todo) {
	var newTodo = $("<li>" + todo.name + "</li>");
	if (todo.completed) {
		newTodo.addClass("done");
	}
	$(".list").append(newTodo);
}
