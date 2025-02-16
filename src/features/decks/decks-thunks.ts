import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { handleError } from '../../common/utils/handle-error.ts'
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
// case-2: network error - axios создаёт объект ошибки, сообщение можно взять из поля error.message
// case-3: синхронные ошибки - создаётся "нативная" JS-ошибка, имеет поле message

// syntax async/await
// export const _updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
//   try {
//     // throw new Error('Boooom!')
//     const res = await decksAPI.updateDeck(params)
//     dispatch(updateDeckAC(res.data))
//   } catch (error: any) {
//     const errorMessage: string = error.response.data.errorMessages[0].message
//
//     // you code
//     if (errorMessage.length) {
//       console.log(errorMessage)
//     } else {
//       console.log(error.message + "!!!!!!!!!!")
//     }
//     console.log(error.message + "AAAAAAAAAAAAAAAA")
//   }
// }

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    // throw new Error("Синхронная ошибка")
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))

    // var1
    // } catch (error: any) {
    //   let errorMessage: string = 'Неизвестная ошибка' // fallback сообщение - Если ни одно из условий не сработало, чтобы не оставлять undefined
    //
    //   if (error.response?.data?.errorMessages?.length) {
    //     errorMessage = error.response.data.errorMessages[0].message // case 1: ошибка с бэкенда
    //   } else if (error.message) {
    //     errorMessage = error.message // case 2: ошибка сети или case 3: синхронная ошибка
    //   }
    //
    //   console.error('Ошибка при обновлении колоды:', errorMessage)
    // }

    // var2
    // catch (error: any) {
    //   if (error.response && error.response.data && error.response.data.errorMessages) {
    //     console.error("Ошибка с бэкенда:", error.response.data.errorMessages[0].message)
    //   } else if (error.message === "Network Error") {
    //     console.error("Ошибка сети:", error.message)
    //   } else {
    //     console.error("Синхронная ошибка:", error.message)
    //   }
    // }

    // var3
  } catch (e) {
    handleError(e as Error, dispatch)
  }
}


