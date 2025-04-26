import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "./PostForm";

const user = userEvent.setup();

describe("Given the PostForm component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Título' text box", () => {
      const expectedTitleRegex = /título/i;
      render(<PostForm />);

      const titleTextBox = screen.getByLabelText(expectedTitleRegex);

      expect(titleTextBox).toBeVisible();
    });

    test("Then it should show a 'Crear post' inside a disabled button", () => {
      const expectedButtonRegex = /crear post/i;
      render(<PostForm />);

      const submitButton = screen.getByRole("button", {
        name: expectedButtonRegex,
      });

      expect(submitButton).toBeVisible();
      expect(submitButton).toBeDisabled();
    });
  });

  describe("And the user types 'Huevos fritos' in 'Título' text box", () => {
    test("Then it should show 'Huevos fritos' in 'Título' text box", async () => {
      const postTitle = "Huevos fritos";
      const expectedTitleRegex = /título/i;
      render(<PostForm />);

      const titleTextBox = screen.getByLabelText(expectedTitleRegex);

      await user.type(titleTextBox, postTitle);

      expect(titleTextBox).toHaveValue(postTitle);
    });

    test("Then it should show a 'Crear post' button enabled", async () => {
      render(<PostForm />);

      const titleTextBox = screen.getByLabelText(/título/i);
      const authorTextBox = screen.getByLabelText(/autor\/a/i);
      const imageTextBox = screen.getByLabelText(/imagen url/i);
      const contentTextBox = screen.getByLabelText(/contenido/i);

      await user.type(titleTextBox, "a");
      await user.type(authorTextBox, "a");
      await user.type(imageTextBox, "https://www.google.com/");
      await user.type(contentTextBox, "a");

      const submitButton = screen.getByRole("button", {
        name: /crear post/i,
      });

      expect(submitButton).toBeEnabled();
    });
  });
});
