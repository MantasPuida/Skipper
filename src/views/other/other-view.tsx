import * as React from "react";
import "./other-view-styles.scss";

export const OtherView = React.memo(() => {
	const handleMovable = () => {
		const constrain = 50;
		const mouseOverContainer = document.getElementById("containerMovableId");
		const ex1Layer = document.getElementById("boxMovableId");

		if (!mouseOverContainer || !ex1Layer) {
			return;
		}

		mouseOverContainer.onmousemove = event => {
			window.requestAnimationFrame(() => {
				const box = ex1Layer.getBoundingClientRect();
				const calcX = -(event.clientY - box.y - box.height / 2) / constrain;
				const calcY = (event.clientX - box.x - box.width / 2) / constrain;

				ex1Layer.style.transform = `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
			});
		};
	};

	React.useEffect(() => {
		handleMovable();
	}, []);

	return (
		<div id="containerMovableId" className="containerMovable">
			<div id="boxMovableId" className="boxMovable" />
		</div>
	);
});
