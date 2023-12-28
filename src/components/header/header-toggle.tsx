import * as React from "react";
import { MoonIcon } from "./header-icons/moon-icon";
import { SunIcon } from "./header-icons/sun-icon";
import { Helpers } from "../../utils/helpers";

export const HeaderToggle = React.memo(() => {
	const toggleDarkMode = (isDarkMode: boolean) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		Helpers.HandleDarkClass({
			isDarkMode,
			setLocalStorage: true
		});
	};

	return (
		<div className="text-right">
			<span className="px-1 py-[3px] inline-flex border bg-gray-200 rounded-md">
				<div className="dark:translate-x-full translate-x-0 duration-300 h-[22px] w-12 bg-white  rounded shadow absolute" />
				<button onClick={toggleDarkMode(false)} type="button" className="px-4 py-[3px] z-0 rounded">
					<SunIcon />
				</button>
				<button onClick={toggleDarkMode(true)} type="button" className="px-4 py-[3px] z-0 rounded">
					<MoonIcon />
				</button>
			</span>
		</div>
	);
});
