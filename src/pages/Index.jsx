import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const HackerNewsTop100 = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const topStoriesResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const top100Ids = topStoriesResponse.data.slice(0, 100);
        
        const storyPromises = top100Ids.map(id => 
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );
        
        const storyResponses = await Promise.all(storyPromises);
        const fetchedStories = storyResponses.map(response => response.data);
        
        setStories(fetchedStories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top 100 Stories</h1>
      
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredStories.map(story => (
            <li key={story.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-sm text-gray-600 mt-1">Upvotes: {story.score}</p>
              <Button
                variant="link"
                className="mt-2 p-0"
                onClick={() => window.open(story.url, '_blank')}
              >
                Read more
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackerNewsTop100;