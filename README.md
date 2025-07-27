# VDS-widget
## Preview / Предпросмотр
![Alt Text](https://github.com/MixikQ/Valorant-Daily-Stats/blob/main/WidgetGif.gif)

## How to support me / Как поддержать меня
To support me you can tell your viewers about VDS-widget or donate me any amount

Чтобы поддержать проект, ты можешь рассказать своим зрителям о виджете или задонатить любую сумму

[![](https://i.ibb.co/whpG2y97/Donation-Alerts.png)](https://www.donationalerts.com/r/mixq)

- *ERC20 - 0x1D76387Bf21327dBF7670C534Aaf8eA420336365*
- *BTC - 1AmiZShKuekxU6sEXSCnBVtdDfvZZeLtQR*
- *SOL - CWb5SGVtZyUL18ybfTZPVdou5kyRnperFrVUFAddwWWS*
## Language select / Выбор языка
[ENG](#ENG) / [RU](#RU)
# ENG
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

After downloading extract all files to any folder and open file `config.js` with notepad

You will see there: 

```js
const nickname              = `REPLACE WITH NICKNAME`;                  // Valorant in-game nickname
const tag                   = `REPLACE WITH TAG`;                       // Valorant in-game tag
const region                = `REPLACE WITH REGION`;                    // Possible regions: eu / na / latam / br / ap / kr
const platform              = `REPLACE WITH PLATFORM`;                  // Possible platforms: pc / console
const api_key               = `REPLACE WITH API KEY`;                   // Gets in HenrikDev discord

// Customization
const background_color      = `REPLACE WITH COLOR IN HEX`;
const text_color            = `REPLACE WITH COLOR IN HEX`;
// Progress Bar
const left_color            = `REPLACE WITH COLOR IN HEX`;
const right_color           = `REPLACE WITH COLOR IN HEX`;
```
Replace all strings with your data, to set solid color set the same color in **left_color** and **right_color**

Then open OBS and add **browser source**, click on a checkbox `Local file` and select `daily-stats.html` 

Set width <ins>**447**</ins> and height to <ins>**66**</ins>

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

После скачивания, нужно извлечь все файлы из архива в любую удобную папку и открыть файл `config.js`

В нем будет: 

```js
const nickname              = `REPLACE WITH NICKNAME`;                  // Valorant in-game nickname
const tag                   = `REPLACE WITH TAG`;                       // Valorant in-game tag
const region                = `REPLACE WITH REGION`;                    // Possible regions: eu / na / latam / br / ap / kr
const platform              = `REPLACE WITH PLATFORM`;                  // Possible platforms: pc / console
const api_key               = `REPLACE WITH API KEY`;                   // Gets in HenrikDev discord

// Customization
const background_color      = `REPLACE WITH COLOR IN HEX`;
const text_color            = `REPLACE WITH COLOR IN HEX`;
// Progress Bar
const left_color            = `REPLACE WITH COLOR IN HEX`;
const right_color           = `REPLACE WITH COLOR IN HEX`;
```
Замени все поля соответствующими данными, чтобы установить один цвет нужно вписать один и тот же цвет в поля **left_color** и **right_color**

Затем открой ОБС и добавь источник **браузер**, поставь галочку `Локальный файл` и выбери файл `daily-stats.html`

Установи ширину <ins>**477**</ins> и высоту <ins>**66**</ins>

**Теперь виджет готов к использованию!**
