import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "hooks/providers/useAuthProvider";
import { FC } from "react";

describe("AuthContextのテスト", () => {
  it("AuthProviderの子コンポーネントに認証値が提供されること", () => {
    const TestComponent: FC = () => {
      const { loading, isSignedIn, currentUser } = useAuth();
      return (
        <div>
          <div>Loading: {loading.toString()}</div>
          <div>isSignedIn: {isSignedIn.toString()}</div>
          <div>currentUser: {currentUser?.name || "undefined"}</div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loadingElement = screen.getByText("Loading: false");
    const isSignedInElement = screen.getByText("isSignedIn: false");
    const currentUserElement = screen.getByText("currentUser: undefined");
    expect(loadingElement).toBeInTheDocument();
    expect(isSignedInElement).toBeInTheDocument();
    expect(currentUserElement).toBeInTheDocument();
  });
});
