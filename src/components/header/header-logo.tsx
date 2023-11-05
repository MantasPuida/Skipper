import * as React from "react";
import logo from "../../../public/skipper.png";

export const HeaderLogo = React.memo(() => (
	<div>
		<img className="h-6" src={logo} alt="logo" />
	</div>
));
