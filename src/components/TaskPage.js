import { useState } from 'react';
import styles from '../app.module.css';
import { useLoadTodos, useEditedTodo, useDeleteTodo } from '../hooks';
import { useParams } from 'react-router-dom';
import { StepBackLink } from '../components/index';

export const TaskPage = (refreshTodos, setRefreshTodos) => {
	const [currentId, setCurrentId] = useState();
	console.log('refreshTodos', refreshTodos);
	const params = useParams();
	const todos = useLoadTodos();

	let taskTitle = '';
	let taskId = '';
	todos.forEach(({ title, id }) => {
		if (id === Number(params.id)) {
			taskTitle = title;
			taskId = id;
		}
	});

	const {
		editedTodo,
		onClickOpenToEditTodo,
		onChangeEditedTodo,
		onSubmitEditedTodo,
		openModal,
		editedTodoError,
	} = useEditedTodo(refreshTodos, setRefreshTodos, currentId, setCurrentId);

	const onClickDeleteTodo = useDeleteTodo(setCurrentId, refreshTodos, setRefreshTodos);
	return (
		<>
			<StepBackLink />
			<div
				className={`${styles.todosContainer} ${openModal ? styles.blured : null}`}
			>
				<div className={styles.todo}>
					{taskTitle}
					<div>
						<span
							className={styles.editButton}
							onClick={() => onClickOpenToEditTodo(taskId)}
						></span>
						<span
							className={styles.deleteButton}
							onClick={() => onClickDeleteTodo(taskId)}
						></span>
					</div>
				</div>
			</div>
			<form
				onSubmit={onSubmitEditedTodo}
				className={`${styles.editTodoForm} ${openModal ? styles.active : null}`}
			>
				{editedTodoError && <div className={styles.error}>{editedTodoError}</div>}
				<input onChange={onChangeEditedTodo} value={editedTodo}></input>
				<button disabled={!!editedTodoError}>Edit todo</button>
			</form>
		</>
	);
};
