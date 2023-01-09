import React from 'react'
import { useQuery } from 'react-query'
import * as api from '../api/postsApi';
import Post from './Post';
import PostDetails from './PostDetails';

export default function Posts() {
  const [page, setPage] = React.useState(1);
  const [activeId, setActiveId] = React.useState(undefined);
  const fetchPosts = async ({ queryKey }) => await api.getPosts(queryKey[1]);

  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: [`posts`, page],
    queryFn: fetchPosts,
    keepPreviousData: true,
    retry: 3,
  })

  // if (isFetching) {
  //   return <h1>Background fetching...</h1>
  // }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='wrapper'>
      <div className='posts'>
        {data.map((post) => (
          <Post post={post} key={post.id} setActiveId={setActiveId} />
        ))}
        <div className='pagination'>
          <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>Previous</button>
          <span>{page}</span>
          <button
            onClick={() => setPage((old) => ((!data.length || data.length < 10) ? old : old + 1))}
            disabled={(!data.length || data.length < 10)}
          >
            Next
          </button>
        </div>
      </div>
      <div className='post-details'>
        <PostDetails postId={activeId} />
      </div>
    </div>
  )
}
