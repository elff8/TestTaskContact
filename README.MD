# Тестовое задание: Книга контактов
Создать страницу, на которой будет выводиться список контактов.
У каждого контакта будет следующая информация: номер телефона и имя.
На этой же странице должна быть кнопка «Добавить контакт», которая
открывает модальное окно с двумя полями ввода: «Номер телефона» и
«Имя», эти поля обязательные, внизу модального окна должны
находиться две кнопки: «Добавить» и «Отмена». Недавно добавленный
номер телефона должен находиться в самом верху списка.
Контакты можно редактировать и удалять. Удаление должно
происходить с подтверждением через модальное окно, где должны
находиться две кнопки: «Удалить» и «Отмена», редактирование должно
происходить в модальном окне, где должны находиться две кнопки:
«Сохранить» и «Отмена», по нажатию на кнопку «Отмена» все изменения
отменяются и закрывается модальное окно.
Со стороны сервера реализовать простое REST API c сохранением
информации в БД. Все данные, которые приходят от клиента,
необходимо валидировать. В случае использования полноценной БД
создание и изменение таблиц необходимо выполнять через миграции. В
случае использования встроенной БД – файлы с данными должны быть
сохранены в репозитории.
(!) Результат разработки должен быть сохранён на сервисе
github с локальными коммитами разработчика. Ссылку на репозиторий
необходимо указать при отклике на вакансию.

## Содержание
- [Технологии](#технологии)
- [Начало работы](#начало-работы)

## Технологии
- **Frontend**:
- [ReactHooks] (https://react.dev/reference/react/hooks)
- [TypeScript] (https://www.typescriptlang.org/)
- **Backend**:
- [NodeJs] (https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [PostgreSQ] (https://www.postgresql.org/)
- [Sequelize] (https://sequelize.org/docs/v6/other-topics/typescript/)

## Начало работы
### Предварительные требования
- Node.js v18+
- npm v9+
- PostgreSQL
#### Настройка
Параметры подключения к базе данных заданы в файле: backend/config/config.json.
```sh
"development": {
  "username": "postgres",
  "password": "password",
  "database": "contacts_db",
  "host": "localhost",
  "port": 5432,
  "dialect": "postgres"
}
```
Копируйте репозиторий:
```sh
git clone https://github.com/elff8/TestTaskContact
cd TestTaskContact
```
#### Применение миграции
```sh
cd backend
npx sequelize-cli db:migrate --env development
```
#### Установка зависимостей
Backend:
```sh
cd backend
npm install express sequelize sequelize-typescript sqlite3 reflect-metadata cors
npm install --save-dev typescript @types/node @types/express @types/cors ts-node
```
Убедитесь, что все пакеты установились:
```sh
npm list express sequelize sqlite3
```
Frontend:
```sh
cd frontend
npm install react react-dom @types/react @types/react-dom
npm install --save-dev vite @vitejs/plugin-react
```
Убедитесь, что все пакеты установились:
```sh
npm list react vite
```
#### Запуск
Запустить бэк:
```sh
npm start
```
Запустите фронт:
```sh
npm run dev
```
В терминале ддолжна появиться ссылка, ctrl+нажаите на ссылку откроет её.



