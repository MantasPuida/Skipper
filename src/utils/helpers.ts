import { Constants } from "./constants";

export namespace Helpers {
	export const AddDarkClass = (setLocalStorage?: boolean) => {
		document.documentElement.classList.add(Constants.DarkClass);

		if (setLocalStorage) {
			chrome.storage.local.set({ isDarkMode: true });
		}
	};

	export const RemoveDarkClass = (setLocalStorage?: boolean) => {
		document.documentElement.classList.remove(Constants.DarkClass);

		if (setLocalStorage) {
			chrome.storage.local.set({ isDarkMode: false });
		}
	};

	export const HandleDarkClass = (isDarkMode: boolean, setLocalStorage?: boolean) => {
		if (isDarkMode) {
			AddDarkClass(setLocalStorage);
			return;
		}

		RemoveDarkClass(setLocalStorage);
	};
}
