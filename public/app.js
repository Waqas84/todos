$(document).ready(function() {
	$.getJSON("/api/todos").then(addTodos);

	$("#todoInput").keypress(function(event) {
		if (event.which == 13) {
			createTodo();
		}
	});

	$(".list").on("click", "li", function(event) {
		updateTodo($(this));
	});

	$(".list").on("click", "span", function(event) {
		event.stopPropagation();
		removeTodo($(this).parent());
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
			$("#todoInput").val("");
		})
		.catch(function(err) {
			console.log(err);
		});
}

function addTodo(todo) {
	var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
	newTodo.data("id", todo._id);
	newTodo.data("completed", todo.completed);
	if (todo.completed) {
		newTodo.addClass("done");
	}
	$(".list").append(newTodo);
}

function updateTodo(todo) {
	var updateUrl = `/api/todos/${todo.data("id")}`;
	var isDone = !todo.data('completed');
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: {completed: isDone}
	})
	.then(function(updatedTodo) {
		todo.toggleClass('done')
		console.log(updatedTodo);
	})
}

function removeTodo(todo) {
	var clickedId = todo.data("id");
	console.log(`/api/todos/${clickedId}`);
	var deleteUrl = `/api/todos/${clickedId}`;
	$.ajax({
		method: "DELETE",
		url: deleteUrl
	}).then(function(data) {
		todo.remove();
	});
}
