import React, { useState } from "react";
import "./categoryfilters.css";

interface CategoryFiltersProps {
  categories?: string[];
  tags?: string[];
  onFilterChange?: (selectedCategories: string[], selectedTags: string[]) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories = [],
  tags = [],
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange?.(updated, selectedTags);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updated);
    onFilterChange?.(selectedCategories, updated);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    onFilterChange?.([], []);
  };

  return (
    <div className="category-filters">
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

      <div className="tag-buttons">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTags.includes(tag) ? "active" : ""}
          >
            {tag}
          </button>
        ))}
      </div>

      {(selectedCategories.length > 0 || selectedTags.length > 0) && (
        <button className="reset-filters" onClick={resetFilters}>
          Reset All Filters
        </button>
      )}
    </div>
  );
};

export default CategoryFilters;
