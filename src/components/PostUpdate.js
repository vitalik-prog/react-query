import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../api/postsApi';

export default function PostUpdate({ post, setIsEditing }) {
  const [fields, setFields] = React.useState(post);
  const queryClient = useQueryClient();
  const {isLoading, mutate} = useMutation(api.updatePost, {
    onSuccess: ({ id, post }) => {
      queryClient.setQueryData(['post', id], post);
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['post', id]);
      setIsEditing(false);
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ id: post.id, post: fields })
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label 
          style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}
          htmlFor='title'
        >
          Title
          <input
            type='text'
            name='title'
            id='title'
            value={fields.title}
            onChange={handleChange}
          />
        </label>
        <label
          style={{ display: 'flex', justifyContent: 'space-between' }}
          htmlFor='details'
        >
          Details
          <input
            type='text'
            name='details'
            id='details'
            value={fields.details}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
