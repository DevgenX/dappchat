import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useChatContext } from "@/context/ChatDapp.context";
import { useTheme } from "next-themes";

jest.mock("@/context/ChatDapp.context", () => ({
  useChatContext: jest.fn(),
}));

describe("Navbar component", () => {
  it("renders without errors", () => {
    render(<Navbar />);
  });

  it("displays the logo image", () => {
    render(<Navbar />);
    const logoImage = screen.getByAltText("icon");
    expect(logoImage).toBeInTheDocument();
  });

  it("displays the title", () => {
    render(<Navbar />);
    const title = screen.getByText("ChatDapp");
    expect(title).toBeInTheDocument();
  });

  it("toggles the menu when the menu button is clicked", () => {
    render(<Navbar />);

    // Get the menu button element
    const menuButton = screen.getByTestId("menu-button") as HTMLButtonElement;

    // Initial state: navbar is false
    expect(menuButton).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"'
    ); // Adjust this to match your initial button icon

    // Click the menu button
    fireEvent.click(menuButton);

    // After clicking, navbar should be true
    expect(menuButton).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"'
    ); // Adjust this to match your button icon when navbar is true

    // Click the menu button again
    fireEvent.click(menuButton);
    // After the second click, navbar should be false again
    expect(menuButton).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"'
    ); // Adjust this to match your button icon when navbar is false
  });

  beforeEach(() => {
    (useChatContext as jest.Mock).mockReturnValue({
      connectWallet: jest.fn(),
      username: "John",
      account: "12345",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation links correctly", () => {
    render(<Navbar />);

    // Replace the following example assertions with your actual assertions
    const links = screen.getAllByTestId("navlink");

    // Assert the number of links
    expect(links.length).toBe(3); // Replace with the actual number of links

    // Assert the properties of each link
    const expectedLinks = [
      { label: "Users", page: "users" },
      { label: "Chat", page: "chat" },
      { label: "Tutorials", page: "tutorials" },
    ];
    links.forEach((link, index) => {
      expect(link.getAttribute("href")).toBe(expectedLinks[index].page);
      expect(link.textContent).toBe(expectedLinks[index].label);
    });
  });

  it("calls connectWallet when the 'CONNECT WALLET' button is clicked", () => {
    render(<Navbar />);

    const connectWalletButton = screen.getByTestId("wallet");

    fireEvent.click(connectWalletButton);
    const { connectWallet } = useChatContext();
    expect(connectWallet).toHaveBeenCalled();
  });

  // it("toggles the theme when the theme toggle button is clicked", () => {
  //   render(<Navbar />);

  //   const setThemeMock = jest.fn();
  //   jest.mock("next-themes", () => ({
  //     useTheme: () => ({
  //       systemTheme: "light",
  //       theme: "light",
  //       setTheme: setThemeMock,
  //     }),
  //   }));

  //   const toggleThemeButton = screen.getByTestId("toggle-theme-btn");
  //   fireEvent.click(toggleThemeButton);

  //   expect(setThemeMock).toHaveBeenCalledWith("light");

  //   fireEvent.click(toggleThemeButton);
  //   expect(setThemeMock).toHaveBeenCalledWith("dark");
  // });
});
