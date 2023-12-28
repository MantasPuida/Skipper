import { Constants } from "./components-constants";

interface ToggleOptions {
	isDarkMode: boolean;
	setLocalStorage?: boolean;
}

export namespace Helpers {
	const addDarkClass = (setLocalStorage?: boolean) => {
		document.documentElement.classList.add(Constants.DarkClass);

		if (setLocalStorage) {
			chrome.storage.local.set({ isDarkMode: true });
		}
	};

	const removeDarkClass = (setLocalStorage?: boolean) => {
		document.documentElement.classList.remove(Constants.DarkClass);

		if (setLocalStorage) {
			chrome.storage.local.remove(Constants.LocalStorageKeys.DarkMode);
		}
	};

	export const HandleDarkClass = (options: ToggleOptions) => {
		const { isDarkMode, setLocalStorage } = options;

		if (isDarkMode) {
			addDarkClass(setLocalStorage);
			return;
		}

		removeDarkClass(setLocalStorage);
	};
}
