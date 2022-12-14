
# Команда VVA Dev Team

## Сервис для вовлечения сотрудников во внтурикорпоративные активаности

    Демо версия - http://moretech.demo.vvadev.ru
    Данные для входа в ЛК: логин - admin@vvadev.ru, пароль - 123

    1. Каждая клатка карты - уникальный NFT, за который можно бросить вызов, обменять его на рубли и просто подарить другу
    2. Система батлов между пользователями, позволяющая интересно провести время, получив новые токены или монеты
    3. 4 уровня доступа сотрудников, позволяющих удобно настраивать работу сервиса
        3.1 Администратор - управляет балансами пользователей, выставляет курс конвертации валюты
        3.2 Сотрудник корпоративного отдела - создает квесты, проверяет их выполнение
        3.3 Товаровед - добавляет и удаляет товары в магазине, выставляет их стоимость и отвечает на передачу продукта пользователю
        3.4 Пользователь - сотрудник банка, пользующися всеми игровыми функциями сервиса
    4. Различные виды тестов и задачи, позволяющие узнать много нового о компании и наладить новые связи в коллективе

![Иллюстрация к проекту](https://i.imgur.com/DYOTSXv.jpg)

![Иллюстрация к проекту](https://i.imgur.com/Fc4Aj9O.jpg)

![Иллюстрация к проекту](https://i.imgur.com/w2fx3Ve.jpg)

## Структура проекта

- директория backend - содержит бекенд сервис на Node Express

- директория frontend - содержит фронтенд сервис на React JS

- presentation.pdf - презентация

- questions.txt - примеры вопросов для сотрудников, сформированные на основе изученной документации по корпоративной политике банка

- Хакатон.postman_collection.json - документация по работе с API в виде коллекции postman

- схема бд.drawio - схема базы данных
## Запуск

Для запуска должны быть установлены ```git```, ```docker```, ```docker-compose```, ```Node v16```

1. Скачать репозиторий
```bash
  git clone https://github.com/VVA-Dev-Team/More_Tech_2022
  cd More_Tech_2022
```
2. Запустить фронтенд из папки frontend
```bash
  npm install
  npm start
```
3. Запустить бекенд из папки backend предварительно указав данные в файле .env
```bash
  npm install
  npm start
```
4. Сервис будет доступен по адресу http://localhost:3000/, API - http://localhost:5000/