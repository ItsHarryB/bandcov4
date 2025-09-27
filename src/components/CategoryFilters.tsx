import React, { useState } from "react";

interface CategoryFiltersProps {
  categories: string[];
  tags: string[];
  onFilterChange: (selectedCategories: string[], selectedTags: string[]) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  tags,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange(updated, selectedTags);
  };

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updated);
    onFilterChange(selectedCategories, updated);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    onFilterChange([], []);
  };

  return (
    <div className="filters-row">
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

      <button className="reset-button" onClick={handleReset}>
        &#x2715; Reset All Filters
      </button>
    </div>
  );
};

export default CategoryFilters;
