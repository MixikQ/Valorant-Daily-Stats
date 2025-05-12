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

After downloading extract all files to any folder and open file `config.js` with notepad

You will see there: 

```js
const nickname              = `REPLACE WITH NICKNAME`;                  // Valorant in-game nickname
const tag                   = `REPLACE WITH TAG`;                       // Valorant in-game tag
const region                = `REPLACE WITH REGION`;                    // Possible regions: eu / na / latam / br / ap / kr
const platform              = `REPLACE WITH PLATFORM`;                  // Possible platforms: pc / console
const api_key               = `REPLACE WITH API KEY`;                   // Gets in HenrikDev discord

// Customization
const width                 = 1000;                                     // Width in px, only digit (example 1000)
const show_rank             = `REPLACE WITH TRUE or FALSE`;             // If TRUE shows rank before RR
const enable_bar_gradient   = `REPLACE WITH TRUE or FALSE`;             // If TRUE enables gradient on progress bar
const color_bar             = `REPLACE WITH COLOR IN HEX`;              // Color of progress bar (example #000000) ignored if enable_bar_gradient is true 
const first_gradient_color  = `REPLACE WITH COLOR IN HEX`;              // Left color of gradient
const second_gradient_color = `REPLACE WITH COLOR IN HEX`;              // Right color of gradient
const border_width          = 3;                                        // Width of border in pixels
const radius                = 6;                                        // Radius in pixels 
const color_border          = `REPLACE WITH COLOR IN HEX`;              // Color of border of progress bar
const color_bg              = `REPLACE WITH COLOR IN HEX`;              // Color of progress bar background
```
Replace all strings with your data, pay attention that `color_bar` will be ignored, if `enable_bar_gradient` set to *TRUE* and both `first_gradient_color` and `second_gradient_color` will be ignored if *FALSE*

Then open OBS and add **browser source**, click on a checkbox `Local file` and select `main.html` 

Set width <ins>**the same**</ins> as you set in the `config.js` and height to *70*

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
const width                 = 1000;                                     // Width in px, only digit (example 1000)
const show_rank             = `REPLACE WITH TRUE or FALSE`;             // If TRUE shows rank before RR
const enable_bar_gradient   = `REPLACE WITH TRUE or FALSE`;             // If TRUE enables gradient on progress bar
const color_bar             = `REPLACE WITH COLOR IN HEX`;              // Color of progress bar (example #000000) ignored if enable_bar_gradient is true 
const first_gradient_color  = `REPLACE WITH COLOR IN HEX`;              // Left color of gradient
const second_gradient_color = `REPLACE WITH COLOR IN HEX`;              // Right color of gradient
const border_width          = 3;                                        // Width of border in pixels
const radius                = 6;                                        // Radius in pixels 
const color_border          = `REPLACE WITH COLOR IN HEX`;              // Color of border of progress bar
const color_bg              = `REPLACE WITH COLOR IN HEX`;              // Color of progress bar background
```
Замени все поля соответствующими данными, обрати внимание, что поле `color_bar` будет проигнорировано, если `enable_bar_gradient` установлено *TRUE*, и наоборот, поля `first_gradient_color` и `second_gradient_color` будут проигнорированы, если `enable_bar_gradient` установлено *FALSE*

Затем открой ОБС и добавь источник **браузер**, поставь галочку `Локальный файл` и выбери файл `main.html`

Установи <ins>**такую же**</ins> ширину, как и в файле `config.js` и высоту *70*

**Теперь виджет готов к использоавнию!**
