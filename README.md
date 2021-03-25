# Snake

Snake made from Phaser

## Installation

```bash
1)npm install
2)npm run dev
```

## About

Для выполнения задания использовались React, Phaser, MongoDB. Для Front-end использовались React, Phaser. На стороне Back-End использовались Express, MongoDB а так же bcrypt для создания уникального токена.
Впервые использовал phaser не смог полностью совместить с реакт-роутингом как было изначально запланировано.

Приложение делиться на четыре сцены: Start ( StartScene, AuthScene), Game( GameScene ), Game result( OverTimeScene, WonLevelScene ), Rating( RatingScene ).

Start Scene поле для регистрации пользователя(не меньше 3 букв). Информация сохраняется в DB и LocalStorage. Переходит к Game Scene. Если в LocalStorage есть существующий пользователь его перенаправляет на Auth Scene где отображается общее количество очков и уровень игры, также переходит на Game Scene.

Game Scene отображение уровня игры, количество очков, таймера игры.При самопоедании, или истечении времени если не набрано достаточно количество очков происходит переход к Over Time Scene (на последнем уровне нету ограничения по очкам). Если набрано нужное количество очков переходит к Won Level Scene.

Over Time Scene набранное и необходимое количество очков.В случае с пользователем максимального уровня показывает количество набраных очков в раунде, и общее количество очков пользователя. Имеет доступ к Game Scene, Rating Scene.

Won Level Scene поздравление, отображает следующий уровень. Имеет доступ к Game Scene, Rating Scene.

Rating Scene отображает топ 10 игроков с базы данных. Имеет доступ Game Scene.