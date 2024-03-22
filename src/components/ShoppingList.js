import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from server
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Callback function to handle item update
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // Callback function to handle item addition
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // Callback function to handle item deletion
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // Callback function to handle category change
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Filter items based on selected category
  const itemsToDisplay = selectedCategory === "All" ?
    items :
    items.filter((item) => item.category === selectedCategory);

  return (
    <div className="ShoppingList">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
