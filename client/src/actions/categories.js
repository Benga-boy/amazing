import { createCategory } from '../lib/api'
import { CREATECATEGORY } from './types'


export const createCat = name => async dispatch => {
  try {
    const res = await createCategory(name)
    dispatch({
      type: CREATECATEGORY,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}