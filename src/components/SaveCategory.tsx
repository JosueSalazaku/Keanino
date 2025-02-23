import React, { useState } from "react";

interface SaveCategoryProps {
  category: string;
}

export default function SaveCategory({ category }: SaveCategoryProps) {
  return (
    <select value={category}>
      <option>People</option>
      <option>Pages</option>
      <option>Places</option>
    </select>
  );
}
