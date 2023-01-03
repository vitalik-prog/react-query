import React from 'react'

export default function Post({ post }) {
  return (
    <div className='card'>
      <div className='text-container'>
        <h2>{post.title}</h2>
        <p className='title'> Author</p>
        <p className='last-location'>{post.author}</p>
      </div>
    </div>
  )
}
