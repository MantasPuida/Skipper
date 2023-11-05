import * as React from "react";
import { Constants } from "../utils/constants";
import { Helpers } from "../utils/helpers";

interface Props {
	children?: React.ReactNode;
}

export const LayoutWrapper = React.memo<Props>(props => {
	React.useEffect(() => {
		chrome.storage.local.get("isDarkMode").then(pair => {
			Helpers.HandleDarkClass(pair[Constants.LocalStorageKeys.DarkMode]);
		});
	}, []);

	return <div className="w-[360px] h-[600px] bg-white">{props.children}</div>;
});
