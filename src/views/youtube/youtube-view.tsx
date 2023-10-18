import * as React from "react";
// import { YtConstants } from "../../utils/yt-constants";
// import { handleAdSkip } from "../../utils/yt-helpers";

export const YoutubeView = React.memo(() => {
	const handleCompleted = (details: chrome.webRequest.WebResponseCacheDetails) => {
		console.log("handleCompleted - details:", details);
		// const { url, frameId, tabId } = details;
		// console.log("handleCompleted => details:", details);

		// const { searchParams } = new URL(url);
		// const label = searchParams.get("label");
		// console.log("handleCompleted => label:", label);

		// switch (label) {
		// 	case YtConstants.InteractionRequestLabels.SkipShown:
		// 		handleAdSkip(frameId, tabId, label);
		// 		break;
		// 	default:
		// 		break;
		// }
	};

	React.useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
			const tab = tabs[tabs.length - 1];
			console.log("chrome.tabs.query - tab :", tab);

			chrome.webRequest.onResponseStarted.addListener(handleCompleted, {
				urls: ["<all_urls>"]
				// urls: YtConstants.WebRequestUrls,
				// tabId: tab.id,
				// windowId: tab.windowId,
				// types: YtConstants.WebRequestTypes
			});

			return () => chrome.webRequest.onCompleted.removeListener(handleCompleted);
		});
	}, []);

	const ytView = "Yt View";
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{ytView}</>;
});
