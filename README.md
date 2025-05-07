# Valorant-Daily-Stats

[ENG](#ENG) / [RU](#RU)
### ENG
**This widget works with all ranks**

Feel free to DM me to offer some new features 

discord: [@mixq](https://discord.com/users/353798731377934337)

To use it you need to get API key in [HenrikDev discord](https://discord.com/invite/X3GaVkX2YN)

### Short [guide](https://docs.henrikdev.xyz/authentication-and-authorization) how to get API key:

- Join [discord](https://discord.com/invite/X3GaVkX2YN)
- Verify
- Go to **#get-a-key** channel
- Select from the dropdown list "VALORANT"
- After that, you can select from the following key types:
  - "Basic" ⇒ 30req/min, granted without approval from HenrikDev side (**recommended**)
  - "Advanced" ⇒ 90req/min, requires HenrikDev approval

After downloading extract all files to any folder and open file *config.js* with notepad

You will see there: 

```js
const nickname   = "REPLACE WITH NICKNAME";     // Valorant in-game nickname
const tag        = "REPLACE WITH TAG";          // Valorant in-game tag
const region     = "REPLACE WITH REGION";       // Possible regions: eu / na / latam / br / ap / kr
const platform   = "REPLACE WITH PLATFORM";     // Possible platforms: pc / console
const api_key    = "REPLACE WITH API KEY";      // Gets in HenrikDev discord
```
Replace all strings with your data

Then open OBS and add **browser source**, click on a checkbox *"Local file"* and select *"main.html"*, set width to *500* and height to *70*

**Now widget are ready to use!**

### RU
**Виджет работает правильно для всех рангов**

Не стесняйтесь писать мне в ЛС, чтобы предлагать новые функции

discord: [@mixq](https://discord.com/users/353798731377934337)

Чтобы использовать виджет, нужен АПИ ключ, который можно получить в [дискорде HenrikDev](https://discord.com/invite/X3GaVkX2YN)

### Короткий [гайд](https://docs.henrikdev.xyz/authentication-and-authorization) как получить АПИ ключ:

- Вступить в [дискорд](https://discord.com/invite/X3GaVkX2YN)
- Пройти верефикацию
- Перейти в канал **#get-a-key**
- Выбрать "VALORANT" в выпадающем списке
- После этого, можно выбрать тип ключа:
  - "Basic" ⇒ 30 запросов/минута, гарантируется без разрешения со стороны разработчиков (рекомендую этот тип)
  - "Advanced" ⇒ 90 запросов/минута, нужно чтобы подтвердили разработчики

После скачивания, нужно извлечь все файлы из архива в любую удобную папку и открыть файл *"config.js"*

В нем будет: 

```js
const nickname   = "REPLACE WITH NICKNAME";     // Valorant in-game nickname
const tag        = "REPLACE WITH TAG";          // Valorant in-game tag
const region     = "REPLACE WITH REGION";       // Possible regions: eu / na / latam / br / ap / kr
const platform   = "REPLACE WITH PLATFORM";     // Possible platforms: pc / console
const api_key    = "REPLACE WITH API KEY";      // Gets in HenrikDev discord
```
Замени все поля соответствующими данными

Затем открой ОБС и добавь источник **браузер**, поставь галочку *"Локальный файл"* и выбери файл *"main.html"*, установи ширину *500* и высоту *70*

**Теперь виджет готов к использоавнию**
