import React, { useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";
import "../styles/categoryfilters.css"; // plain CSS import

interface CategoryFiltersProps {
  categories?: string[];
  tags?: string[];
  allPosts: CollectionEntry<"blog">[];
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories = [],
  tags = [],
  allPosts,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Toggle category
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Toggle tag
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  // Compute filtered posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        (post.data.category && selectedCategories.includes(post.data.category));
      const matchesTags =
        selectedTags.length === 0 ||
        post.data.tags.some((t) => selectedTags.includes(t));
      return matchesCategory && matchesTags;
    });
  }, [allPosts, selectedCategories, selectedTags]);

  return (
    <div className="category-filters">
      <div className="filters-row">
        {/* Reset button on the left */}
        <button className="reset-filters" onClick={resetFilters}>
          Reset All Filters
        </button>

        {/* Category buttons */}
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={selectedCategories.includes(category) ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag buttons */}
      <div className="tag-buttons">
        {tags?.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTags.includes(tag) ? "active" : ""}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog posts grid */}
      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <a key={post.id} href={`/posts/${post.id}/`} className="post-card">
              {post.data.image && (
                <div className="post-image-wrapper">
                  <img
                    src={post.data.image.url}
                    alt={post.data.image.alt || post.data.title}
                  />
                </div>
              )}
              <div className="post-content">
                <h3>{post.data.title}</h3>
                <p className="post-date">
                  {post.data.pubDate.toLocaleDateString()}
                </p>
                <p className="post-description">{post.data.description}</p>
                <div className="post-tags">
                  {post.data.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="read-more">Read more →</p>
              </div>
            </a>
          ))
        ) : (
          <p className="no-results">No posts match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
