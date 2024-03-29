export const useDeleteTodo = (setCurrentId, refreshTodos, setRefreshTodos) => {
	console.log('refreshTodos', refreshTodos);
	const onClickDeleteTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo deleted:', response);
				setCurrentId(id);
				setRefreshTodos(!refreshTodos);
			});
	};

	return onClickDeleteTodo;
};
