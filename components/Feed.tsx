'use client';

import { useState, useEffect, Suspense } from 'react';
import PromptCard from './PromptCard';
import Loading from '@components/Loading';

const PromptCardList = ({ data, handleTagClick }: { data: any[]; handleTagClick: (search: string) => void }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map(post => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<any>();
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterPrompts = (search: string) => {
    const regex = new RegExp(search, 'i');
    return posts.filter(
      (item: any) => regex.test(item?.creator?.username) || regex.test(item?.tag) || regex.test(item?.prompt)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();

      setPosts(data);
      setLoading(false);
    };

    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        ></input>
      </form>
      {loading ? (
        <Loading />
      ) : searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
