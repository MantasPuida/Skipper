export namespace ServiceWorkerConstants {
	export const WebRequestUrls = ["https://www.youtube.com/api/stats/atr*"];
	export const WebRequestTypes: chrome.webRequest.ResourceType[] = ["xmlhttprequest"];

	export const SkipButtonSelectors = ["ytp-ad-skip-button ytp-button", "ytp-ad-skip-button-modern ytp-button"];
	export const SkipButtonParentSelector = "ytd-player";

	export const RequestParamKey = "el";
	export enum RequestLabels {
		AdUnit = "adunit",
		SkipShown = "video_skip_shown",
		Skipped = "videoskipped",
		ImpressionTracking = "video_companion_impression_tracking",
		FullPlaytime = "videoplaytime100"
	}
}
