import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'

// async/await fetchDecksTC
export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    console.log('fetchDecksTC error', { error })
  }
}

// // then/catch fetchDecksTC
// export const _fetchDecksTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC('loading'))
//   decksAPI.fetchDecks().then((res) => {
//     dispatch(setDecksAC(res.data.items))
//     dispatch(setAppStatusAC('succeeded'))
//   })
// }

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

// syntax then
// export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
//   return decksAPI.updateDeck(params).then((res) => {
//     dispatch(updateDeckAC(res.data))
//   })
// }

// case-1: ошибка бэкенда (на стороне бэкенда). Ошибку создаёт axios, в error.response.data помещает ответ сервера
// syntax async/await
export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (error) {
    console.log(error)
  }
}
