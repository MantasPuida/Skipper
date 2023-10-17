type InjectionArgs = string[];

export const handleAdSkip = (frameId: number, tabId: number, label: string) => {
	const handleScriptInjection = (...args: InjectionArgs) => {
		const labelArg = args[args.length - 1];
		console.log("handleScriptInjection - labelArg:", labelArg);

		const ytdPlayer = document.getElementById("ytd-player");
		console.log("handleScriptInjection - ytdPlayer:", ytdPlayer);
		const chain = ytdPlayer ?? document;

		const classNames = ["ytp-ad-skip-button ytp-button", "ytp-ad-skip-button-modern ytp-button"];
		classNames.forEach(className => {
			const elementsWithClassName = chain.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>;
			console.log("handleScriptInjection - elementsWithClassName:", elementsWithClassName);
			if (elementsWithClassName.length === 0) {
				return;
			}

			for (let i = 0; i < elementsWithClassName.length; i++) {
				const buttonElement = elementsWithClassName[i];
				console.log("handleScriptInjection - buttonElement:", buttonElement);
				buttonElement.click();
			}
		});
	};

	chrome.scripting
		.executeScript<InjectionArgs, any>({
			target: { tabId, frameIds: [frameId] },
			func: handleScriptInjection,
			injectImmediately: true,
			args: [label]
		})
		.then(() => console.log("injected"));
};
