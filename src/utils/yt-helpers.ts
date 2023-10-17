export const handleAdSkip = (frameId: number, tabId: number) => {
	const handleScriptInjection = () => {
		const YtdPlayer = document.getElementById("ytd-player");

		if (!YtdPlayer) {
			return;
		}

		YtdPlayer.getElementsByClassName("ytp-ad-skip-button ytp-button");
	};

	chrome.scripting
		.executeScript({
			target: { tabId, frameIds: [frameId] },
			func: handleScriptInjection,
			injectImmediately: true
		})
		.then(() => console.log("injected"));
};
