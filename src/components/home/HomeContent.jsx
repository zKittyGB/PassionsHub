import "../../css/HomeContent.css"

function Cards(props) {
	console.log(props)
	return (
		<div key={props.passion.id} className="card" data-category={props.passion.category} data-tags={props.passion.tags.join(",")}
>
			<div className="card-header">
				<img src={"../../../public/pictures/" + props.passion.cover_picture} alt={props.passion.title} />
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
	)
}

function HomeContent(props) {
	return (
		<>
			<div className="home-content">
				{props.passions.map((passion, index) => (
					<Cards key={index} passion={passion} />
				))}
			</div>
		</>
	)
}

export default HomeContent
