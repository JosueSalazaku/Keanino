import React, { useState } from "react";

function SaveCategory() {
    const [category, setCategory] = useState<string>("Category");

    async function handleSavingCategory( postId: string) {
        //
    }

  return (
    <select value={category}>
      <option>People</option>
      <option>Pages</option>
      <option>Places</option>
    </select>
  );
}

export default SaveCategory;
