export namespace ServiceWorkerConstants {
	export const WebRequestUrls = ["https://www.youtube.com/pagead/interaction/*"];
	export const WebRequestTypes: chrome.webRequest.ResourceType[] = ["xmlhttprequest"];

	export const SkipButtonSelectors = ["ytp-ad-skip-button ytp-button", "ytp-ad-skip-button-modern ytp-button"];
	export const SkipButtonParentSelector = "ytd-player";

	export const RequestParamKey = "label";
	export enum RequestLabels {
		SkipShown = "video_skip_shown",
		Skipped = "videoskipped",
		ImpressionTracking = "video_companion_impression_tracking"
	}
}
