
const initialState = {
    list: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
    case 'GET_VIDEOS': {
      const { payload } = action;
      return {
        ...state,
        list: payload,
      }
    }
    
    default: {
      return state;
    }
  }
}
