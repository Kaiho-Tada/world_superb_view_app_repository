import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "hooks/providers/useAuthProvider";

describe('AuthContext', () => {
  it('should provide authentication values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    function TestComponent() {
      const { loading, isSignedIn, currentUser } = useAuth();
      return (
        <div>
          <div>Loading: {loading.toString()}</div>
          <div>isSignedIn: {isSignedIn.toString()}</div>
          <div>currentUser: {currentUser?.name || 'undefined'}</div>
        </div>
      );
    };
    const loadingElement = screen.getByText('Loading: false');
    const isSignedInElement = screen.getByText('isSignedIn: false');
    const currentUserElement = screen.getByText('currentUser: undefined');
    expect(loadingElement).toBeInTheDocument();
    expect(isSignedInElement).toBeInTheDocument();
    expect(currentUserElement).toBeInTheDocument();
  });
});
