import React, { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer';

export const useTodos = (initialState = []) => {

    const init = () => {
        return JSON.parse(localStorage.getItem('todos'))|| [];
    }

    const [todos, dispatch] = useReducer ( todoReducer, initialState, init);

    const todosCount = todos.length;

    useEffect( () => {  
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
   
    const handleNewTodo = (todo) =>{
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) =>{
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) =>{
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }
  
    return {
        todos,
        todosCount,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
