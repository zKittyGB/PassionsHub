import { Navigate } from "react-router-dom";

// Component to protect routes that require a logged-in user
// Redirects users who are not logged in to the login page
function UnloggedProtectedRoute({ user, children }) {
	// If user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Otherwise, render the child components
	return children;
}

export default UnloggedProtectedRoute;
