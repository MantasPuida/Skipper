import * as React from "react";
import { HeaderToggle } from "./header-toggle";
import { HeaderLogo } from "./header-logo";

export const Header = React.memo(() => (
	<div className="grid grid-cols-2 p-4 bg-neutral-100  items-center">
		<HeaderLogo />
		<HeaderToggle />
	</div>
));
