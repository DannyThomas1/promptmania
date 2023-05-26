'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      console.log('posts', data);
      setPosts(data);
      setLoading(false);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile name={name || ''} desc={`Welcome to ${name}'s personalized profile page`} data={posts} loading={loading} />
  );
};

export default UserProfile;
