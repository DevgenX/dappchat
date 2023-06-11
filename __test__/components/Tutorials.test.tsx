import Tutorials from "@/components/Tutorials";
import { render, screen } from "@testing-library/react";

describe("Tutorials Component", () => {
  it("Tutorials component renders without errors", () => {
    render(<Tutorials />);
  });

  it("Renders the heading", () => {
    render(<Tutorials />);

    const heading = screen.getByTestId("heading");
    const headingContent = "Experience Blockchain Messaging";

    expect(heading).toHaveTextContent(headingContent);
  });

  it("Renders the Paragraph", () => {
    render(<Tutorials />);

    const paragraph = screen.getByTestId("paragraph");
    const paragraphContent =
      "Ready to experience the decentralized way of messaging?";

    expect(paragraph).toHaveTextContent(paragraphContent);
  });
});
