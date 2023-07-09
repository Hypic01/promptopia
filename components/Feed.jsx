'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({ data, searchText, handleTagClick }) => {

  const filteredData = searchText ? data.filter((post) => {
    return post.prompt.toLowerCase().includes(searchText.toLowerCase()) 
    || post.tag.toLowerCase().includes(searchText.toLowerCase()) 
    || post.creator.username.toLowerCase().includes(searchText.toLowerCase());
  }) : data;


  return (
    <div className="mt-16 prompt_layout">
      {filteredData.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer" />
      </form>

      <PromptCardList 
        data={posts}
        searchText={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed