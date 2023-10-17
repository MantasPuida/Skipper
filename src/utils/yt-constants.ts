export namespace YtConstants {
	export const YtOrigin = "https://www.youtube.com";
	export const YtMusicOrigin = "https://music.youtube.com";
	export const YtPathname = "/watch";

	export const WebRequestUrls: string[] = ["https://www.youtube.com/pagead/interaction/*"];
	export const WebRequestTypes: chrome.webRequest.ResourceType[] = ["xmlhttprequest"];

	export enum InteractionRequestLabels {
		SkipShown = "video_skip_shown",
		VideoSkipped = "videoskipped"
	}
}
