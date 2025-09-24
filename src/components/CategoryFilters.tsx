import React, { useState } from 'react';

interface Post {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    description: string;
    category?: string;
    tags: string[];
    image?: { url: string; alt?: string };
  };
}

interface CategoryFiltersProps {
  categories: string[];
  allPosts: Post[];
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, allPosts }) => {
  const [filter, setFilter] = useState('All');

  const filteredPosts =
    filter === 'All'
      ? allPosts
      : allPosts.filter((p) => p.data.category === filter);

  return (
    <>
      {/* Category Buttons */}
      <div className="category-buttons">
        <button
          className={filter === 'All' ? 'active' : ''}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <a href={`/posts/${post.id}/`} className="post-card" key={post.id}>
            {post.data.image && (
              <div className="post-image-wrapper">
                <img
                  src={post.data.image.url}
                  alt={post.data.image.alt ?? ''}
                />
              </div>
            )}

            <div className="post-content">
              {post.data.category && (
                <p className="post-category">{post.data.category}</p>
              )}
              <h3>{post.data.title}</h3>
              <p className="post-date">{post.data.pubDate.toLocaleDateString()}</p>
              <p className="post-description">{post.data.description}</p>

              <div className="post-tags">
                {post.data.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>

              <p className="read-more">Read more →</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default CategoryFilters;
