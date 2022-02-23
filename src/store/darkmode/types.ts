
export interface DarkMode {
	status: boolean;
}

export enum DarkModeActionTypes {
	TOGGLE_DARK_MODE = '@@darkmode/TOGGLE_DARK_MODE',
}

export interface DarkModeState {
	readonly status: boolean;
}
