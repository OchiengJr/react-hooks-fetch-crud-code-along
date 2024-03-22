import { rest } from "msw";
import { data } from "./data";

let items = [...data];
let id = items[items.length - 1].id;

// Reset data function
export function resetData() {
  items = [...data];
  id = items[items.length - 1].id;
}

// Request handlers
export const handlers = [
  // GET request handler
  rest.get("http://localhost:4000/items", (req, res, ctx) => {
    return res(ctx.json(items));
  }),

  // POST request handler
  rest.post("http://localhost:4000/items", (req, res, ctx) => {
    id++;
    const newItem = { id, ...req.body };
    items.push(newItem);
    return res(ctx.json(newItem));
  }),

  // DELETE request handler
  rest.delete("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const itemId = parseInt(id);

    // Check for invalid ID
    if (isNaN(itemId)) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }

    // Filter out item with the specified ID
    items = items.filter((item) => item.id !== itemId);
    return res(ctx.json({}));
  }),

  // PATCH request handler
  rest.patch("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const itemId = parseInt(id);

    // Check for invalid ID
    if (isNaN(itemId)) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }

    // Find the index of the item with the specified ID
    const itemIndex = items.findIndex((item) => item.id === itemId);

    // Update item with the specified ID
    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], ...req.body };
      return res(ctx.json(items[itemIndex]));
    } else {
      return res(ctx.status(404), ctx.json({ message: "Item not found" }));
    }
  }),
];
