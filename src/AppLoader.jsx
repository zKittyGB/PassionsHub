import App from "./App.jsx";
import useUser from "./context/useUser.js";

function AppLoader() {
	const { loading } = useUser();

	if (loading) {
		return (<></>);
	}
	return <App />;
}

export default AppLoader;
