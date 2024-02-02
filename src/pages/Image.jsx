import axios from 'axios'
import React, { useState } from 'react'

export default function ImageUpload() {
    const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/api/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  let payload = new FormData()
payload.append('image', File)
axios.post('https://api.imgbb.com/1/upload?expiration=600&key=17d74797a64a4ed97d0982c31d95c223', payload)
    .then((response) => {
        console.log('response', response)
        console.log('response URL', response.data.data.image.url)
        console.log('success')
    })
    .catch((error) => {
        console.log('error', error)
        alert('try agian')
    }) 

  return (
    <div className='App'>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  )
}
