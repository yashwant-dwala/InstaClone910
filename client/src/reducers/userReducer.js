// as a kind of useEffect
export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type == "CLEAR") {
    return null;
  }
  if (action.type == "UPDATE") {
    return {
      ...state,//spreded prev state
      followers: action.payload.followers,
      following:action.payload.following
    }
  }
  if (action.type == "UPDATEPIC") {
    return {
      ...state,//spreded prev state
      pic:action.payload
    }
  }
  return state;
};
