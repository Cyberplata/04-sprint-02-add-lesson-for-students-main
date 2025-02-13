import type { RequestStatusType } from './app-reducer.ts'
import type { AppRootState } from './store.ts'

export const selectSetAppStatus = (state: AppRootState): RequestStatusType => state.app.status