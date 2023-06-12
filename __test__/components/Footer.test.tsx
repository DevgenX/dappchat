import { render, screen, within } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  it("renders the footer with correct content", () => {
    render(<Footer />);
  });

  it("renders the correct links with icons", () => {
    render(<Footer />);

    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(3);

    const githubLink = screen.getByTestId("footer-github");
    const linkedinLink = screen.getByTestId("footer-linkedin");
    const mediumLink = screen.getByTestId("footer-medium");

    expect(githubLink).toHaveAttribute("href", "https://github.com/DevgenX");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sebgonzales/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(mediumLink).toHaveAttribute("href", "https://medium.com/@seb_5882");
    expect(mediumLink).toHaveAttribute("target", "_blank");
  });
});
