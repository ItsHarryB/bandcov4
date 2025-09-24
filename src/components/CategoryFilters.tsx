import React, { useState, useEffect, useRef } from "react";
import "../styles/blog.css";

interface Post {
  id: string;
  data: {
    title: string;
    description?: string;
    image?: { url: string; alt: string };
    category?: string;
    tags: string[];
    pubDate: Date;
  };
}

interface CategoryFiltersProps {
  categories: string[];
  allPosts: Post[];
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, allPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter posts by category and tag
  const filteredPosts = allPosts.filter((p) => {
    if (selectedCategory && p.data.category !== selectedCategory) return false;
    if (selectedTag && !p.data.tags.includes(selectedTag)) return false;
    return true;
  });

  // IntersectionObserver for fade-in animation
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll(".blog-card.fade-in");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredPosts]);

  return (
    <div className="blog-section">
      {/* Category buttons */}
      <div className="category-buttons">
        <button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "active" : ""}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedTag(null); // reset tag filter when category changes
            }}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="blog-cards" ref={containerRef}>
        {filteredPosts.map((post) => (
          <div key={post.id} className="blog-card fade-in">
            {/* Image */}
            {post.data.image && (
              <div className="card-image">
                <img src={post.data.image.url} alt={post.data.image.alt} />
              </div>
            )}

            {/* Title & Description */}
            <h3>{post.data.title}</h3>
            {post.data.description && <p>{post.data.description}</p>}

            {/* Tags as buttons (like category buttons) */}
            {post.data.tags.length > 0 && (
              <div className="category-buttons post-tags">
                {post.data.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={selectedTag === tag ? "active" : ""}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Read more link */}
            <a href={`/posts/${post.id}/`} className="read-more">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
