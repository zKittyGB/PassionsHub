import { Navigate } from "react-router-dom";

// Component to protect routes for logged-in users
// Redirects logged-in users away from pages like login or signup
function LoggedProtectedRoute({ user, children }) {
	// If user is logged in, redirect to home page
	if (user) {
		return <Navigate to="/" replace />;
	}

	// Otherwise, render the child components
	return children;
}

export default LoggedProtectedRoute;
