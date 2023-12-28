import { ServiceWorkerConstants } from "../utils/service-worker-constants";

class BackgroundServiceWorker {
	private validateElement = (element: Element): element is HTMLButtonElement => (element as HTMLButtonElement).click !== undefined;

	private handleInjection = (frameId: number, tabId: number, parentSelector: string, classNames: string[]) => {
		const handleScriptInjection = (...args: [string, string[]]) => {
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
					const isValidButtonElement = this.validateElement(buttonElement);
					if (!isValidButtonElement) {
						return;
					}

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
		const { SkipButtonParentSelector, SkipButtonSelectors } = ServiceWorkerConstants;
		this.handleInjection(...args, SkipButtonParentSelector, SkipButtonSelectors);
	};

	private handleCompleted = (details: chrome.webRequest.WebRequestBodyDetails) => {
		const { url, frameId, tabId } = details;
		const { searchParams } = new URL(url);

		const label = searchParams.get(ServiceWorkerConstants.RequestParamKey);
		switch (label) {
			case ServiceWorkerConstants.RequestLabels.AdUnit:
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
