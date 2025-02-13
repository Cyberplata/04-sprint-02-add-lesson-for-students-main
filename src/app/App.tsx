import './App.css'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { Decks } from '../features/decks/Decks.tsx'
import { selectSetAppStatus } from './app-selectors.ts'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from './store.ts'

export const App = () => {
  const status = useAppSelector(selectSetAppStatus)

  return (
    <div>
      {status === 'loading' && <LinearLoader />}
      <Decks />
      <GlobalError />
    </div>
  )
}
