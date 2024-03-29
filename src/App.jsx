import { useEffect, useState } from 'react';
import Todos from './components/Todos';
import Register from './pages/Register';
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/Login';


function App() {
  const [title, setTitle] = useState("");
  const [todoMessage, setTodoMessage] = useState("");
  const [imgFile, setImgFile] = useState(null);
  // const [todos, setTodos] = useState()
  const [userData, setUserData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  console.log(selectedFile)

  console.log(userData)



  const handleUserData = (data) => {
    setUserData(data);
    console.log(Register.data)
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      todoMessage,
      imageUrl: selectedFile
    };

    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const data = await response.json();
      toast.success("Successfully created")
      console.log(data); 


    } catch (error) {
      console.error(error);
      
    }
  };


  


// console.log(todos)
  return (
    <>
    
      <div>
      <div className='flex justify-center '>
        <form onSubmit={submitHandler} className=' bg-yellow-100 px-32 py-10 my-10'>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            className=' p-3 mb-4 w-full'
            type="text"
            name="title"
          /><br />
          <textarea
            onChange={(e) => setTodoMessage(e.target.value)}
            placeholder='content'
            className='px-3 py-8 w-full'
            type="text"
            name='content'
          /> <br />
          <input
            
            type='file'
            className='w-full'
          />

          <div className='flex justify-center'>
            <button type='submit' className='px-6 py-3 mt-6 bg-blue-500 text-white rounded-md'>
              Add
            </button>
          </div>
        </form>
      </div>
      <Todos/>
      </div>
     <div>
     {/* <Login handleUserData = {handleUserData}/> */}
     </div>
     <Toaster/>
    </>
  );
}

export default App;


