import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuth } from "@/hooks/use-auth";
import { AuthContext, AuthProvider } from "@/providers/AuthProvider";
import { User } from "@/interfaces/entities/user.entity";

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: jest.fn((key: string) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
    };
})();

Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    writable: true,
});

// Mock document.cookie
const mockCookies: Record<string, string> = {};

Object.defineProperty(document, "cookie", {
    get: jest.fn(() => {
        return Object.entries(mockCookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");
    }),
    set: jest.fn((cookie) => {
        const [key, value] = cookie.split("=");

        // Remove the cookie if it is expired or empty
        if (!value.trim() || value.includes("expires") || value.includes("max-age=0")) {
            delete mockCookies[key.trim()];
        } else {
            mockCookies[key.trim()] = decodeURIComponent(value);
        }
    }),
    configurable: true,
});



beforeEach((): void => {
    jest.restoreAllMocks(); // Recover all mocks
    mockLocalStorage.clear();
    Object.keys(mockCookies).forEach((key) => delete mockCookies[key]); // Fully clear mock cookies
});


// Test component
const TestComponent = () => {
    const { user, login, logout } = useAuth();

    return (
        <div>
            {user ? (
                <>
                    <div data-testid="user-email">{user.email}</div>
                    <button onClick={logout} data-testid="logout-button">Logout</button>
                </>
            ) : (
                <button onClick={() => login("admin@example.com", "password")} data-testid="login-button">Login</button>
            )}
        </div>
    );
};

describe("AuthProvider", (): void => {

    test("Should provide initial auth values", () => {
        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {(value) => (
                        <>
                            <div data-testid="user">{JSON.stringify(value.user)}</div>
                            <div data-testid="loading">{String(value.loading)}</div>
                        </>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        expect(screen.getByTestId("user").textContent).toBe("null");
        expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    test("Should load user from localStorage and cookies on mount", async () => {
        const mockUser = { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" };
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {(value) => (
                        <>
                            <div data-testid="user">{value.user ? value.user.email : "no user"}</div>
                            <div data-testid="loading">{String(value.loading)}</div>
                        </>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("loading").textContent).toBe("false");
        });

        expect(screen.getByTestId("user").textContent).toBe("admin@example.com");
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("fleet-user");
    });

    test("Should login successfully and store user in localStorage and cookies", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(screen.getByTestId("user-email")).toBeInTheDocument();
        });

        expect(screen.getByTestId("user-email").textContent).toBe("admin@example.com");
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith("fleet-user", expect.any(String));

        expect(document.cookie).toContain("fleet-user=");
    });

    test("Should logout successfully and remove user from localStorage and cookies", async () => {
        const mockUser: User = { id: "1", name: "Admin User", email: "admin@example.com" };
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("user-email")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("logout-button"));

        await waitFor(() => {
            expect(screen.getByTestId("login-button")).toBeInTheDocument();
        });

        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("fleet-user");
        await waitFor(() => {
            expect(document.cookie).toContain("fleet-user=");
        });
    });


});
