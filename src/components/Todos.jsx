import React, { useEffect, useState } from 'react';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedTodoMessage, setUpdatedTodoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/todos");
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const shouldDelete = window.confirm("Are you sure you want to delete this todo?");

      if (shouldDelete) {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }

        await fetchTodos(); // Wait for the fetch to complete before resetting state
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (todo) => {
    setEditedTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedTodoMessage(todo.todoMessage);
  };

  const handleCancelEdit = () => {
    setEditedTodo(null);
    setUpdatedTitle("");
    setUpdatedTodoMessage("");
  };

  const handleUpdateTitle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const hangleUpdatedTodoMessage = (e) => {
    setUpdatedTodoMessage(e.target.value);
  };




  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${editedTodo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle, todoMessage: updatedTodoMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      await fetchTodos(); // Wait for the fetch to complete before resetting state
      setEditedTodo(null);
      setUpdatedTitle("");
      setUpdatedTodoMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className='mx-20 grid gap-10 grid-cols-2'>
        {todos?.map((todo) => (
          <div className='bg-green-200' key={todo._id}>
            {editedTodo?._id === todo._id ? (
              <form onSubmit={handleUpdateSubmit}>
                <input type='text' value={updatedTitle} onChange={handleUpdateTitle} />
                <br />
                <br />
                <textarea type="text" value={updatedTodoMessage} onChange={hangleUpdatedTodoMessage} name="" id="" />

                <input type="file" />
                <br />
                <button className='px-5 bg-blue-600 text-white rounded-md' type='submit'>
                  Update
                </button>
                <button className='px-5 bg-red-600 text-white rounded-md ml-6' type='button' onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h1 className='py-3 text-2xl text-center'>{todo.title}</h1>
                <p className='px-2'>{todo.todoMessage}</p>
                <div>
                  <button className='px-5 bg-blue-600 text-white rounded-md' onClick={() => handleEditClick(todo)}>
                    Edit
                  </button>
                  <button className='px-5 bg-red-600 text-white rounded-md ml-6' onClick={() => deleteTodo(todo._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </>
  );
}
