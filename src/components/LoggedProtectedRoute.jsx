import { Navigate } from "react-router-dom";

function LoggedProtectedRoute({ user, children }) {
	if (user) {
		// Redirige vers Accueil si connecté
		return <Navigate to="/" replace />;
	}
	return children;
}

export default LoggedProtectedRoute;
