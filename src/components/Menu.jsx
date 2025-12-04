import "../css/Menu.css";
import useUser from "../context/useUser.js";
import { Link } from "react-router-dom";

// Component to display the main navigation menu
function Menu(props) {
	// Access the current user from context
	const { user } = useUser();

	return (
		<>
			<div className="main-menu">
				<ul>
					{/* Link to Home */}
					<Link to="/">
						<li>
							<div className="btn-wrapper">
								<button className={`btn ${props.selected === 'home' ? 'active' : ''}`}>
									Accueil
								</button>
							</div>
						</li>
					</Link>

					{/* Conditional links displayed only if user is logged in */}
					{user && (
						<>
							{/* Link to My Passions */}
							<Link to="/mypassions">
								<li>
									<div className="btn-wrapper">
										<button className={`btn ${props.selected === 'myPassions' ? 'active' : ''}`}>
											Mes passions
										</button>
									</div>
								</li>
							</Link>

							{/* Link to Create a Passion */}
							<Link to="/create">
								<li>
									<div className="btn-wrapper">
										<button className={`btn ${props.selected === 'create' ? 'active' : ''}`}>
											Créer une passion
										</button>
									</div>
								</li>
							</Link>

							{/* Link to Profile */}
							<Link to="/profile">
								<li>
									<div className="btn-wrapper">
										<button className={`btn ${props.selected === 'profile' ? 'active' : ''}`}>
											Mon profil
										</button>
									</div>
								</li>
							</Link>
						</>
					)}

				</ul>
			</div>
		</>
	)
}

export default Menu;
