# Дополнительный урок 02 для спринта 04 (Четверг)

- [Swagger документация](https://api.flashcards.andrii.es/docs)
- [react-toastify demo](https://fkhadra.github.io/react-toastify/introduction/)
- [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton#readme)
- [Пример готового проекта](https://04-sprint-02-add-lesson-for-mentor.vercel.app/)

### Задание 1
`1. Рендерить компонент LinearLoader в компоненте App при выполнении запроса за колодами (fetchDecks)

- добавить action (setAppStatus) в appReducer
- переписать fetchDecksTC, меняя status на 'succeeded' или 'failed' (использовать синтаксис async/await, try...catch)
- resultCode не нужен`

### Задание 2
1. Дизейблить кнопки update и delete во время запросов при редактировании и удалении колоды
- используем useState в компоненте DeckItem
- подсказка: dispatch thunk возвращает промис

### Задание 3
Вывести в консоль сообщение об ошибке учтя все 3 кейса из файла decks-thunks.ts (updateDeckTC). То есть из объекта ошибки достать как-то сообщение об ошибке.
- case-1: ошибка бэкенда (на стороне бэкенда). Ошибку создаёт axios, в error.response.data помещает ответ сервера
- case-2: network error - axios создаёт объект ошибки, сообщение можно взять из поля error.message
- case-3: синхронные ошибки - создаётся "нативная" JS-ошибка, имеет поле message

### Задание 4
1. Вынести обработку ошибок в функцию - передать в неё err и dispatch, и записывать сообщение ошибки в redux state
2. Получить сообщение об ошибке из redux в компоненте GlobalError

### Задание 5
1. Джейнерик функцию применить в task-1.ts getLastItem
2. Джейнерик функцию применить в task-2.tsx в компоненте MyComponent