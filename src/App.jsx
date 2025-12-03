import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyPassions from "./pages/MyPassions.jsx";
import "./css/App.css";
import useUser from "./context/useUser.js";
import LoggedProtectedRoute from "./components/LoggedProtectedRoute.jsx";
import UnloggedProtectedRoute from "./components/UnloggedProtectedRoute.jsx";

function App() {
	const { user } = useUser();

	return (
		<BrowserRouter>
			<Header />
			<Routes>

				<Route path="/" element={<Main />} />
				<Route
					path="/login"
					element={
						<LoggedProtectedRoute user={user}>
							<Login />
						</LoggedProtectedRoute>
					}
				/>				
				<Route
					path="/signup"
					element={
						<LoggedProtectedRoute user={user}>
							<Signup />
						</LoggedProtectedRoute>
					}
				/>				
				<Route
					path="/mypassions"
					element={
						<UnloggedProtectedRoute user={user}>
							<MyPassions />
						</UnloggedProtectedRoute>
					}
				/>				
			</Routes>
		</BrowserRouter>
	)
}

export default App;
