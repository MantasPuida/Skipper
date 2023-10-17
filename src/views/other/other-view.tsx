import * as React from "react";
import "./other-view-styles.scss";

export const OtherView = React.memo(() => (
	<div style={{ width: "500px", height: "500px" }}>
		<div className="box">
			<div className="box__ghost">
				<div className="symbol" />
				<div className="symbol" />
				<div className="symbol" />
				<div className="symbol" />
				<div className="symbol" />
				<div className="symbol" />

				<div className="box__ghost-container">
					<div className="box__ghost-eyes">
						<div className="box__eye-left" />
						<div className="box__eye-right" />
					</div>
					<div className="box__ghost-bottom">
						<div />
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
				<div className="box__ghost-shadow" />
			</div>

			<div className="box__description">
				<div className="box__description-container">
					<div className="box__description-title">Whoops!</div>
					<div className="box__description-text">It seems You are not on youtube</div>
				</div>
			</div>
		</div>
	</div>
));
