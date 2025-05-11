# 🌐 Создание простой технологии маршрутизации на Node.js

## 📚 Описание проекта

В этом руководстве мы создадим собственный простой **маршрутизатор** — технологию, которая работает похожим образом на Express.js: обрабатывает HTTP-запросы и вызывает соответствующие функции-обработчики. Это поможет глубже понять, как устроены веб-серверы и как работает backend на Node.js.

---

## 🔍 Исследование предметной области

### Что такое маршрутизация?

Маршрутизация — это процесс определения, какая функция должна обрабатывать запрос по конкретному URL и HTTP-методу.

**Пример:**
- GET `/home` → показать главную страницу
- POST `/form` → обработать данные формы

### Как это делает Express?

Express.js:
- использует объект `app` для регистрации маршрутов (`app.get(...)`, `app.post(...)`)
- под капотом создает `Layer` (слой), где хранятся путь, метод и обработчик
- при запросе перебирает слои, ищет совпадение и вызывает обработчик

---

## ⚙️ Создание своей технологии маршрутизации

Мы реализуем:
1. Класс `Layer` — слой маршрута
2. Класс `Route` — набор обработчиков для пути
3. Класс `Router` — диспетчер маршрутов
4. Объект `app` с методами `.get`, `.post` и запуском сервера

---

## 📦 Структура проекта

mini-router/
├── index.js // Точка входа
├── router.js // Класс Router и Route

---

## 🛠 Пошаговое руководство

### Инициализация проекта

mkdir mini-router
cd mini-router
npm init -y

## Создание express.js

```
exports = module.exports = createApplication;

function createApplication() {
  let app = function(req, res, next) {
    app.handle(req, res, next);
  };

  // Миксовать методы
  mixin(app, require('./app'), false);

  app.init();
  return app;
}

```

## Создание App.js

```
methods.forEach(function(method) {
  app[method] = function(path, ...handlers) {
    this.lazyrouter();
    const route = this._router.route(path);
    route[method](...handlers);
    return this;
  };
});

app.listen = function(...args) {
  const server = http.createServer(this);
  return server.listen(...args);
};

app.handle = function(req, res, out) {
  this._router.handle(req, res, out);
};


```

## Создание router.js
```

// router.js
const Layer = require('./layer');

class Router {
  constructor() {
    this.stack = [];
  }

  get(path, handler) {
    this.stack.push(new Layer(path, 'GET', handler));
  }

  post(path, handler) {
    this.stack.push(new Layer(path, 'POST', handler));
  }

  handle(req, res) {
    const { url, method } = req;

    for (const layer of this.stack) {
      if (layer.match(url, method)) {
        return layer.handle(req, res);
      }
    }

    res.statusCode = 404;
    res.end('Not Found');
  }
}

module.exports = Router;

```

## Создание index.js

```
// index.js
const http = require('http');
const Router = require('./router');

const router = new Router();

router.get('/', (req, res) => {
  res.end('Главная страница');
});

router.get('/about', (req, res) => {
  res.end('О нас');
});

router.post('/data', (req, res) => {
  res.end('Данные получены');
});

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(3000, () => {
  console.log('Сервер работает на http://localhost:3000');
});

```

## Поток обработки запроса

[ Клиент ] → [ HTTP-запрос ] → [ Router → Layer → Handler ] → [ HTTP-ответ ]

## Дерево проекта

mini-router/
├── index.js
├── router.js
├── express.js
└── app.js
