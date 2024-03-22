import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  async function handleAddToCartClick() {
    try {
      const response = await fetch(`http://localhost:4000/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isInCart: !item.isInCart,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update item.");
      }
      const updatedItem = await response.json();
      onUpdateItem(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  async function handleDeleteClick() {
    try {
      const response = await fetch(`http://localhost:4000/items/${item.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item.");
      }
      onDeleteItem(item);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
