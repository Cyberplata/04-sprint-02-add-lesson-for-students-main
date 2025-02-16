export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableString = string | null

const initialState = {
  status: 'idle' as RequestStatusType,
  // error: null as string | null,
  error: null as NullableString,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload.status }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'SET_STATUS',
    payload: { status },
  } as const
}

export const setAppErrorAC = (error: NullableString) => {
  return {
    type: 'SET_ERROR',
    payload: { error },
  } as const
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type ActionsType = SetAppStatusActionType | SetAppErrorActionType
