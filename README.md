<p align="center">
  <a title="Learn more about Theme Switch" href="https://marketplace.visualstudio.com/items?itemName=fooxly.themeswitch">
    <img src="https://assets.fooxly.com/extensions/themeswitch/banner.jpg" alt="Workspace" width="100%" />
  </a>
</p>

```bash
ext install fooxly.themeswitch
```

[![Version](https://vsmarketplacebadge.apphb.com/version-short/Fooxly.themeswitch.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.themeswitch)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/Fooxly.themeswitch.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.themeswitch)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating-short/Fooxly.themeswitch.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.themeswitch)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/Fooxly/themeswitch/blob/master/LICENSE)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> This extension is based on [Day Night Theme Switcher] by freetonik

# 🚀&nbsp; Recently Added

* Support for the Official VS Code theme preferences
* Easily switch to/between your preferred light/dark themes
* Option to set the statusbar item priority

## ❤&nbsp; Support us

> About **40%** of your donation goes to one of the charities we support. For further information or questions please visit [our website](https://www.fooxly.com/charity) or contact us via [charity@fooxly.com](mailto:charity@fooxly.com).

<p>
  <a title="BuyMeACoffee" href="https://www.buymeacoffee.com/fooxly">
    <img src="https://assets.fooxly.com/third_party/buymeacoffee.png" alt="BuyMeACoffee" width="180" height="43" />
  </a>&nbsp;&nbsp;
  <a title="Patreon" href="https://www.patreon.com/fooxly">
    <img src="https://assets.fooxly.com/third_party/patreon.png" alt="Patreon" width="180" height="43" />
  </a>&nbsp;&nbsp;
  <a title="PayPal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3GEYSYZFXV9GE">
    <img src="https://assets.fooxly.com/third_party/paypal.png" alt="PayPal" width="180" height="43" />
  </a>
</p>

<br/>

# ☀️&nbsp; Theme Switch

`Theme Switch` provides a simple way to switch between your preferred light and dark theme with a single click.

A package by [Fooxly].
> Based on [Day Night Theme Switcher] by freetonik.

## 📕&nbsp; Features

* Switch between your preferred light/dark themes
* Easily set a new theme as your default light/dark theme

## 💻&nbsp; Preview

<img src="https://assets.fooxly.com/extensions/themeswitch/example.gif" alt="Preview" width="500" />

## 📐&nbsp; Configuration

| property                              | type       | default            | options         | description |
| ---                                   | ---        | ---                | ---             | ----        |
| `workbench.preferredLightColorTheme`  | `string`   | `"Default Light+"` | -               | Your preferred light theme |
| `workbench.preferredDarkColorTheme`   | `string`   | `"Default Dark+"`  | -               | Your preferred dark theme |
| `window.autoDetectColorScheme`        | `boolean`  | `false`            | -               | Instructs VS Code to listen to changes to the OS's color scheme and switch to a matching theme accordingly |
| `themeswitch.toggleDefaultDark`       | `boolean`  | `true`             | `true`, `false` | If your preferred light/dark theme is not the current theme and the toggle is triggered, switch to your dark theme |
| `themeswitch.priority`                | `number`   | `0`                | -               | The priority for the statusbar toggle |

## License

[MIT](https://github.com/Fooxly/themeswitch/blob/master/LICENSE) &copy; [Fooxly]

[Fooxly]: https://www.fooxly.com
[Day Night Theme Switcher]: https://marketplace.visualstudio.com/items?itemName=freetonik.day-night-theme-switcher
