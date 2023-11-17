import { ServiceWorkerConstants } from "../utils/service-worker-constants";

class BackgroundServiceWorker {
	private handleInjection = (frameId: number, tabId: number, parentSelector: string, classNames: string[]) => {
		const handleScriptInjection = (...args: [string, string[]]) => {
			const [parentSelectorArg, classNamesArg] = args;
			const parentSelectorNode = document.getElementById(parentSelectorArg);
			const chain = parentSelectorNode ?? document;

			classNamesArg.forEach(className => {
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
			injectImmediately: true,
			args: [parentSelector, classNames]
		});
	};

	private handleAdSkip = (...args: [number, number]) => {
		this.handleInjection(...args, ServiceWorkerConstants.SkipButtonParentSelector, ServiceWorkerConstants.SkipButtonSelectors);
	};

	private handleCompleted = (details: chrome.webRequest.WebRequestBodyDetails) => {
		const { url, frameId, tabId } = details;
		const myUrl = new URL(url);
		const { searchParams } = myUrl;

		const label = searchParams.get(ServiceWorkerConstants.RequestParamKey);
		switch (label) {
			case ServiceWorkerConstants.RequestLabels.SkipShown:
				this.handleAdSkip(frameId, tabId);
				break;
			default:
				break;
		}
	};

	public ListenToRequests = () => {
		chrome.webRequest.onBeforeRequest.addListener(this.handleCompleted, {
			urls: ServiceWorkerConstants.WebRequestUrls,
			types: ServiceWorkerConstants.WebRequestTypes
		});
	};
}

const backgroundServiceWorker = new BackgroundServiceWorker();
backgroundServiceWorker.ListenToRequests();
