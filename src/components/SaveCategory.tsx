import React from "react";

interface SaveCategoryProps {
  category: string;
  setCategory: (category: string) => void;
}

export default function SaveCategory({ category, setCategory }: SaveCategoryProps) {
  return (
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
      <option value="Choose Category">Choose Category</option>
      <option value="People">People</option>
      <option value="Pages">Pages</option>
      <option value="Places">Places</option>
    </select>
  );
}