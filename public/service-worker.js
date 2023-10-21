const handleInjection = (frameId, tabId, parentSelector, classNames) => {
	const handleScriptInjection = (...args) => {
		const [parentSelectorArg, classNamesArg] = args;
		const parentSelectorNode = document.getElementById(parentSelectorArg);
		const chain = parentSelectorNode ?? document;

		classNamesArg.forEach(className => {
			const elementsWithClassName = chain.getElementsByClassName(className);
			if (elementsWithClassName.length === 0) {
				return;
			}

			for (let i = 0; i < elementsWithClassName.length; i++) {
				const buttonElement = elementsWithClassName[i];
				buttonElement.click();
			}
		});
	};

	chrome.scripting.executeScript({
		target: { tabId, frameIds: [frameId] },
		func: handleScriptInjection,
		injectImmediately: true,
		args: [parentSelector, classNames]
	});
};

const handleAdSkip = (...args) => {
	const selectorClassNames = ["ytp-ad-skip-button ytp-button", "ytp-ad-skip-button-modern ytp-button"];
	const parentSelector = "ytd-player";

	handleInjection(...args, parentSelector, selectorClassNames);
};

const handleAdMute = (...args) => {
	const selectorClassNames = ["ytp-mute-button ytp-button"];
	const parentSelector = "ytp-chrome-controls";

	handleInjection(...args, parentSelector, selectorClassNames);
};

const handleCompleted = details => {
	const { url, frameId, tabId } = details;

	const { searchParams } = new URL(url);
	const label = searchParams.get("label");

	switch (label) {
		case "video_skip_shown":
			handleAdSkip(frameId, tabId);
			break;
		case "video_companion_impression_tracking":
		case "videoskipped":
			handleAdMute(frameId, tabId);
			break;
		default:
			break;
	}
};

const listenToRequests = tab => {
	const WebRequestUrls = ["https://www.youtube.com/pagead/interaction/*"];
	const WebRequestTypes = ["xmlhttprequest"];

	const hasListener = chrome.webRequest.onBeforeRequest.hasListener(handleCompleted);
	if (hasListener) {
		return;
	}

	chrome.webRequest.onBeforeRequest.addListener(handleCompleted, {
		urls: WebRequestUrls,
		tabId: tab?.id,
		windowId: tab?.windowId,
		types: WebRequestTypes
	});
};

const handleOnUpdated = (_tabId, _changeInfo, tab) => {
	const { url } = tab;
	if (!url) {
		return;
	}

	const { origin, pathname } = new URL(url);
	const YtOrigin = "https://www.youtube.com";
	const YtMusicOrigin = "https://music.youtube.com";
	const YtPathname = "/watch";

	const hostNameMatch = origin === YtOrigin || origin === YtMusicOrigin;
	const pathNameMatch = pathname === YtPathname;
	if (!hostNameMatch || !pathNameMatch) {
		const hasListener = chrome.webRequest.onBeforeRequest.hasListener(handleCompleted);
		if (hasListener) {
			chrome.webRequest.onBeforeRequest.removeListener(handleCompleted);
		}

		return;
	}

	listenToRequests(tab);
};

const listenToTabs = () => {
	const hasListener = chrome.tabs.onUpdated.hasListener(handleOnUpdated);
	if (hasListener) {
		return;
	}

	chrome.tabs.onUpdated.addListener(handleOnUpdated);
};

listenToTabs();
