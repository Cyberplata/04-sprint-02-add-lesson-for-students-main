import { useState } from 'react'
import s from './DeckItem.module.css'
import { useAppDispatch } from '../../../../app/store.ts'
import { deleteDeckTC, updateDeckTC } from '../../decks-thunks.ts'
import { Deck } from '../../decks-api.ts'

type DeckProps = {
  deck: Deck
}

// const TEST_ACC_NAME = 'kukus'
const TEST_ACC_NAME = 'Nik-Kik-Shpink'

export const DeckItem = ({ deck }: DeckProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const isTestingDeck = deck.author.name === TEST_ACC_NAME
  const dispatch = useAppDispatch()

  // const handleDeleteButtonClick = () => {
  //   dispatch(deleteDeckTC(deck.id))
  //   setIsLoading(true)
  // }
  //
  // const handleEditButtonClick = () => {
  //   dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` }))
  //   setIsLoading(true)
  // }

  // async/await + try/catch/finally
  const handleDeleteButtonClick = async () => {
    try {
      setIsLoading(true) // 1️⃣ Дизейблим кнопку
      await dispatch(deleteDeckTC(deck.id)) // 2️⃣ Ждём завершения запроса
    } catch (error) {
      console.error('Ошибка при удалении:', error) // 3️⃣ Если ошибка, покажем в консоли
    } finally {
      setIsLoading(false) // 4️⃣ Включаем кнопку обратно
    }
  }

  const handleEditButtonClick = async () => {
    try {
      setIsLoading(true)
      await dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` }))
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // // Или через then/finally:
  // const _handleDeleteButtonClick = () => {
  //   setIsLoading(true)
  //   dispatch(deleteDeckTC(deck.id))
  //     .finally(() => setIsLoading(false))
  // }
  //
  // const _handleEditButtonClick = () => {
  //   setIsLoading(true)
  //   dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` }))
  //     .finally(() => setIsLoading(false))
  // }

  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {isTestingDeck && (
        <div className={s.buttonBox}>
          <button onClick={handleEditButtonClick} disabled={isLoading}>
            update
          </button>
          <button onClick={handleDeleteButtonClick} disabled={isLoading}>
            delete
          </button>
        </div>
      )}
    </li>
  )
}
