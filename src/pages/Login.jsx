import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
          email,
          password
        };
    
        try {
          const response = await fetch("http://localhost:5000/api/user/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to Register');
          }
    
          const data = await response.json();
        //   toast.success("Successfully created")
          console.log(data); 
    
    
        } catch (error) {
          console.error(error);
          
        }
      };
    
  return (
   <>
   <div className=" bg-pink-300 py-10 m-44 ">
    <h1 className=" text-2xl text-center mb-6">Login</h1>
    <form onSubmit={handleSubmit} action="" className=" ml-10">
<div className="mb-4">
    <label htmlFor="name">Email:</label> <br />
    <input onChange={(e) => setEmail(e.target.value)} className="p-2 w-3/4 lg:w-2/4" type="text" placeholder="Enter your email" />
</div>
<div className=" text-left">
    <label htmlFor="name">Password:</label> <br />
    <input onChange={(e) => setPassword(e.target.value)} className="p-2 w-3/4 lg:w-2/4" type="password" placeholder="*******" />
</div>
<div>
<button type="submit" className=" px-5 py-2 bg-green-300 my-5 rounded-md text-white">Submit</button>
</div>
    </form>
   </div>
   
   
   
   </>
  )
}
