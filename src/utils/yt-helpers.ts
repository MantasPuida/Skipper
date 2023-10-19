export const handleAdSkip = (frameId: number, tabId: number) => {
	const handleScriptInjection = () => {
		const selectorYtdPlayer = "ytd-player";
		const ytdPlayer = document.getElementById(selectorYtdPlayer);
		const chain = ytdPlayer ?? document;

		const selectorClassNames = ["ytp-ad-skip-button ytp-button", "ytp-ad-skip-button-modern ytp-button"];
		selectorClassNames.forEach(className => {
			const elementsWithClassName = chain.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>;
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
		injectImmediately: true
	});
};
