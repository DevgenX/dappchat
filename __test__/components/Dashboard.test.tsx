import { render, screen } from "@testing-library/react";
import Dashboard from "@/components/Dashboard";

describe("Dashboard Component", () => {
  it("renders the dashboard with correct content", () => {
    render(<Dashboard />);
  });

  it("Renders the section title", () => {
    render(<Dashboard />);
    const heading = screen.getByTestId("heading");
    const headingContent = "Multi-chain decentralized messaging";
    expect(heading).toHaveTextContent(headingContent);
  });

  it("Renders the paragraph correctly", () => {
    render(<Dashboard />);
    const paragraph = screen.getByText(
      /Message anyone from the blockchain anonymously./i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("Renders the button with correct text", () => {
    render(<Dashboard />);

    const button = screen.getByRole("button", { name: /create account/i });
    expect(button).toBeInTheDocument();
  });

  it("Renders the feautres title", () => {
    render(<Dashboard />);
    const features = screen.getByTestId("section-title");
    const featuresTitle = "Features";
    expect(features).toHaveTextContent(featuresTitle);
  });
});
