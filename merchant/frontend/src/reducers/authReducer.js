export const authReducer = (state, action) => {


	switch (action.type) {
		case 'SET_AUTH':
			return {
				...state,
				isAuthenticated:action.payload.isAuthenticated,
				user:action.payload.user
			}

		default:
			return state
	}
}
