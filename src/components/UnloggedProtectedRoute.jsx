import { Navigate } from "react-router-dom";

function UnloggedProtectedRoute({ user, children }) {
	if (!user) {
		// Redirige vers Accueil si connecté
		return <Navigate to="/login" replace />;
	}
	return children;
}

export default UnloggedProtectedRoute;
