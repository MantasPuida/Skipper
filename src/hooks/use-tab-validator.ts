import * as React from "react";
import { YtConstants } from "../utils/yt-constants";

type HandleUpdated = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void;

export const useTabValidator = () => {
	const [isYoutube, setIsYoutube] = React.useState(false);

	const handleUpdated: HandleUpdated = (_tabId, _changeInfo, tab) => {
		const { url } = tab;

		if (!url) {
			setIsYoutube(false);
			return;
		}

		const { origin, pathname } = new URL(url);
		const hostNameMatch = origin === YtConstants.YtOrigin || origin === YtConstants.YtMusicOrigin;
		const pathNameMatch = pathname === YtConstants.PathName;
		if (!hostNameMatch || !pathNameMatch) {
			setIsYoutube(false);
			return;
		}

		setIsYoutube(true);
	};

	React.useEffect(() => {
		const { onUpdated } = chrome.tabs;

		onUpdated.addListener(handleUpdated);
		return () => onUpdated.removeListener(handleUpdated);
	}, []);

	return isYoutube;
};
