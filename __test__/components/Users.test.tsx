import Users from "@/components/Users";
import { render, screen } from "@testing-library/react";

describe("Tutorials Component", () => {
  it("Users component renders without errors", () => {
    render(<Users />);
  });

  it("Renders the heading", () => {
    render(<Users />);

    const userHeading = screen.getByTestId("user-heading");
    const headingContent = "Meet and Add Friends";

    expect(userHeading).toHaveTextContent(headingContent);
  });

  it("Renders the Paragraph", () => {
    render(<Users />);
    const userParagraph = screen.getByTestId("user-paragraph");
    const paragraphContent =
      "Start chatting anonymously with users by adding them as friends";

    expect(userParagraph).toHaveTextContent(paragraphContent);
  });
});
