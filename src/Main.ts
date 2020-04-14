import {
  window,
  commands,
  workspace,
  ExtensionContext,
  StatusBarItem,
  StatusBarAlignment,
  WorkspaceConfiguration,
  ConfigurationChangeEvent
} from 'vscode'

export default class Main {
  public context: ExtensionContext

  private switch?: StatusBarItem
  private config: WorkspaceConfiguration

  private darkTheme?: string
  private lightTheme?: string

  constructor (context: ExtensionContext) {
    this.context = context
    this.config = workspace.getConfiguration()
    this.Initialize()
  }

  private Initialize () {
    // convert old theming settings
    const oldDark = this.config.get('themeswitch.nightTheme')
    if (oldDark && this.config.get('workbench.preferredDarkColorTheme') !== oldDark) {
      this.config.update('workbench.preferredDarkColorTheme', oldDark, true)
      this.config.update('themeswitch.nightTheme', undefined, true)
    }
    const oldLight = this.config.get('themeswitch.dayTheme')
    if (oldLight && this.config.get('workbench.preferredLightColorTheme') !== oldLight) {
      this.config.update('workbench.preferredLightColorTheme', oldLight, true)
      this.config.update('themeswitch.dayTheme', undefined, true)
    }

    this.getTheme()

    // switch to the dark theme
    this.registerCommand('themeswitch.darktheme', () => {
      if (!this.darkTheme) {
        // TODO: dropdown to select a theme
        return window.showInformationMessage('You have not yet selected a preferred dark theme.')
      }

      this.config.update('workbench.colorTheme', this.darkTheme, true)
    })

    // switch to the light theme
    this.registerCommand('themeswitch.lighttheme', () => {
      if (!this.lightTheme) {
        // TODO: dropdown to select a theme
        return window.showInformationMessage('You have not yet selected a preferred light theme.')
      }

      this.config.update('workbench.colorTheme', this.lightTheme, true)
    })

    // toggle between the themes
    this.registerCommand('themeswitch.toggle', () => {
      if (!this.lightTheme || !this.darkTheme) {
        // TODO: dropdown to select a theme
        return window.showInformationMessage('You have not yet selected a preferred light and/or dark theme.')
      }

      const colorTheme = this.config.get('workbench.colorTheme')
      if (!colorTheme) return this.fallbackToTheme()

      switch (colorTheme) {
        case this.darkTheme: {
          this.config.update('workbench.colorTheme', this.lightTheme, true)
          break
        }
        case this.lightTheme: {
          this.config.update('workbench.colorTheme', this.darkTheme, true)
          break
        }
        default: {
          window.showQuickPick([
            'Dark Theme',
            'Light Theme',
            'Neither'
          ], {
            canPickMany: false,
            placeHolder: 'The theme you are currently using is not your preferred light or dark theme, would you like to make it one?'
          }).then(async v => {
            switch (v) {
              case 'Dark Theme': {
                await this.config.update('workbench.preferredDarkColorTheme', colorTheme, true)
                break
              }
              case 'Light Theme': {
                await this.config.update('workbench.preferredLightColorTheme', colorTheme, true)
                break
              }
            }

            this.getTheme()
            this.fallbackToTheme()
          })
        }
      }
    })

    this.update()
  }

  public destroy () {
    this.switch?.dispose?.()
  }

  public configUpdate (ev: ConfigurationChangeEvent) {
    this.getTheme()
    ev.affectsConfiguration('themeswitch.priority') && this.update(true)
  }

  private fallbackToTheme () {
    const theme = this.config.get('themeswitch.toggleDefaultDark', true) ? this.darkTheme : this.lightTheme
    this.config.update('workbench.colorTheme', theme, true)
  }

  // update the statusbar item
  private update (force = false) {
    // create the switch if it does not already exist
    if (this.switch === undefined || force) {
      this.switch?.dispose?.()
      this.switch = window.createStatusBarItem(StatusBarAlignment.Right, this.config.get('themeswitch.priority', 0))
      this.switch.command = 'themeswitch.toggle'
      this.switch.text = '$(color-mode)'
      this.switch.tooltip = 'Switch theme'
      this.context.subscriptions.push(this.switch)
    }
    this.switch.show()
  }

  private getTheme () {
    this.config = workspace.getConfiguration()
    this.darkTheme = this.config.get('workbench.preferredDarkColorTheme')
    this.lightTheme = this.config.get('workbench.preferredLightColorTheme')
  }

  public registerCommand (uri: string, callback: (...args: any[]) => any) {
    this.context.subscriptions.push(commands.registerCommand(uri, callback))
  }
}
