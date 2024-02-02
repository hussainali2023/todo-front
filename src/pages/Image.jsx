import React, { useState } from 'react'

export default function ImageUpload() {

    const [image, setImage] = useState("")

const imageHandler = (e) =>{
    e.preventDefault()
    console.log(image)
    
}

  return (
    <div>
        <form action="" onSubmit={imageHandler}>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="" />
            <button className='px-6 py-3 rounded-md bg-green-400 text-white'>Upload</button>
        </form>
    </div>
  )
}
