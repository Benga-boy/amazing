import { CREATECATEGORY } from '../actions/types'


const initialState = {
  categories: [],
  category: null,
  loading: true,
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATECATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
      }
    default:
      return state
  }
}