import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ShoppingList from "../components/ShoppingList";

const server = setupServer(
  rest.get('/items', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Yogurt', category: 'Dairy', isInCart: false },
        { id: 2, name: 'Pomegranate', category: 'Fruit', isInCart: false },
        { id: 3, name: 'Lettuce', category: 'Vegetable', isInCart: false }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays all the items from the server after the initial render", async () => {
  render(<ShoppingList />);

  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const pomegranate = await screen.findByText(/Pomegranate/);
  expect(pomegranate).toBeInTheDocument();

  const lettuce = await screen.findByText(/Lettuce/);
  expect(lettuce).toBeInTheDocument();
});

test("adds a new item to the list when the ItemForm is submitted", async () => {
  render(<ShoppingList />);

  const dessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.getByLabelText(/Name/), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/Category/), {
    target: { value: "Dessert" },
  });

  fireEvent.click(screen.getByText(/Add to List/));

  await waitFor(() => screen.getByText(/Ice Cream/));

  const iceCream = screen.getByText(/Ice Cream/);
  expect(iceCream).toBeInTheDocument();

  const desserts = screen.getAllByText(/Dessert/);
  expect(desserts.length).toBe(dessertCount + 1);
});

test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  render(<ShoppingList />);

  const addButtons = await screen.findAllByText(/Add to Cart/);

  expect(addButtons.length).toBe(3);
  expect(screen.queryByText(/Remove From Cart/)).not.toBeInTheDocument();

  fireEvent.click(addButtons[0]);

  await waitFor(() => screen.getByText(/Remove From Cart/));

  const removeButton = screen.getByText(/Remove From Cart/);
  expect(removeButton).toBeInTheDocument();
});

test("removes an item from the list when the delete button is clicked", async () => {
  render(<ShoppingList />);

  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const deleteButtons = screen.getAllByText(/Delete/);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => expect(screen.queryByText(/Yogurt/)).not.toBeInTheDocument());
});
