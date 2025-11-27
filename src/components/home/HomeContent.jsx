import "../../css/HomeContent.css"

function Cards(props) {
	return (
		<div className={`card ${props.passion.hidden ? "hidden" : ""}`}>
			<div className="card-header">
				<img src={"../../pictures/" + props.passion.cover_picture} alt={props.passion.title} />
			</div>
			<div className="card-content">
				<h2>{props.passion.title}</h2>
				<p>{props.passion.description}</p>
				<div className="card-meta-wrapper">
					<span className="card-category">{props.passion.category}</span>
					<span className="card-likes"><i className="fa-solid fa-thumbs-up"></i> {props.passion.likes}</span>
				</div>
				<p>par {props.passion.author.username}</p>
			</div>
		</div>
	);
}

function HomeContent(props) {
	return (
		<>
			<div className="home-content">
				{props.passions.map((passion) => (
					<Cards key={passion.id} passion={passion} />
				))}
			</div>
		</>
	)
}

export default HomeContent
