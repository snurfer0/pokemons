import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DarkModeActionTypes } from '../../store/darkmode/types';
import { ApplicationState } from '../../store/index';

interface Props {
	toggleDarkMode: () => void;
	status: boolean;
}

const DarkModeToggler: React.FC<Props> = ({ toggleDarkMode, status }) => {

	return (
		<div className='switch-wrapper'>
			<span>Light mode</span>
			<label className='switch'>
				<input
					type='checkbox'
					checked={status}
					onChange={() => toggleDarkMode()}
				/>
				<span className='slider round'></span>
			</label>
			<span>Dark mode</span>
		</div>
	);
};

const mapStateToProps = ({ darkMode }: ApplicationState) => {
	return {
		status: darkMode.status,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		toggleDarkMode: () =>
			dispatch({ type: DarkModeActionTypes.TOGGLE_DARK_MODE }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeToggler);
