import React from 'react'
import { useQuery } from 'react-query';
import * as api from '../api/postsApi';
import PostUpdate from './PostUpdate';

export default function PostDetails({ postId }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const fetchPost = async () => await api.getPost(postId);

  const { data: post, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: fetchPost,
    enabled: Boolean(postId),
  })

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (!postId || !post) {
    return <div>Select a post</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  // console.log(post);
  return (
    <div>
      <button onClick={() => setIsEditing((prev) => !prev)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && <PostUpdate post={post} setIsEditing={setIsEditing} />}
      {!isEditing && (
        <>
          <h2>{post.title}</h2>
          <p>{post.details}</p>
        </>
      )}
    </div>
  )
}
