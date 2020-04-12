import { Disposable, ExtensionContext, commands, workspace, window, StatusBarAlignment, StatusBarItem, ConfigurationTarget, ThemeColor, ConfigurationChangeEvent, WorkspaceConfiguration, Uri } from 'vscode'

export default class Main {
  public context: ExtensionContext
  private cmds: Map<string, Disposable> = new Map<string, Disposable>()

  private switch?: StatusBarItem
  private config: WorkspaceConfiguration

  private dayTheme?: string
  private nightTheme?: string

  constructor(context: ExtensionContext) {
    this.context = context
    this.config = workspace.getConfiguration()
    this.Initialize()
  }

  private Initialize() {
    // convert old theming settings
    const oldLight = this.config.get('themeswitch.dayTheme')
    if (oldLight && this.config.get('workbench.preferredLightColorTheme') !== oldLight) {
      this.config.update('workbench.preferredLightColorTheme', oldLight, true)
      this.config.update('themeswitch.dayTheme', undefined, true)
    }
    const oldDark = this.config.get('themeswitch.nightTheme')
    if (oldDark && this.config.get('workbench.preferredDarkColorTheme') !== oldDark) {
      this.config.update('workbench.preferredDarkColorTheme', oldDark, true)
      this.config.update('themeswitch.nightTheme', undefined, true)
    }

    this.getTheme()

    // switch to the day theme
    this.registerCommand('themeswitch.daytheme', () => {
      if(!this.dayTheme || this.dayTheme === '') {
        window.showInformationMessage('Your day theme is not set up!')
        // TODO: dropdown to select a theme
        return
      }
      this.config.update('workbench.colorTheme', this.dayTheme, true)
    })
    // switch to the night theme
    this.registerCommand('themeswitch.nighttheme', () => {
      if(!this.nightTheme || this.nightTheme === '') {
        window.showInformationMessage('Your night theme is not set up!')
        // TODO: dropdown to select a theme
        return
      }
      this.config.update('workbench.colorTheme', this.nightTheme, true)
    })
    // toggle between the themes
    this.registerCommand('themeswitch.toggle', () => {
      const cTheme = this.config.get('workbench.colorTheme')
      if(!this.dayTheme || this.dayTheme === '' || !this.nightTheme || this.nightTheme === '') {
        window.showInformationMessage('Your day and / or night theme are not set up!')
        // TODO: dropdown to select a themes
        return
      }
      if(cTheme === this.dayTheme) {
        this.config.update('workbench.colorTheme', this.nightTheme, true)
      } else if(cTheme === this.nightTheme) {
        this.config.update('workbench.colorTheme', this.dayTheme, true)
      } else {
        // TODO: message that the current theme is not being used as light nor dark, option to set it to one
        if(this.config.get('themeswitch.toggleDefaultDark', true)) {
          this.config.update('workbench.colorTheme', this.nightTheme, true)
        } else {
          this.config.update('workbench.colorTheme', this.dayTheme, true) 
        }
      }
    })
    this.update()
  }

  public destroy () {
    if(this.switch) {
      this.switch.dispose()
    }
  }

  public configUpdate(ev: ConfigurationChangeEvent) {
    this.config = workspace.getConfiguration()
    this.getTheme()
    if(ev.affectsConfiguration('themeswitch.priority')) {
      this.update(true)
    }
  }

  // update the statusbar item
  private update(force = false) {
    // create the switch if it does not already exist
    if (this.switch === undefined || force) {
      if(this.switch) {
        this.switch.dispose()
      }
      this.switch = window.createStatusBarItem(StatusBarAlignment.Right, this.config.get('themeswitch.priority', 0))
      this.switch.command = 'themeswitch.toggle'
      this.switch.text = '$(color-mode)'
      this.switch.tooltip = 'Switch theme'
      this.context.subscriptions.push(this.switch)
    }
    this.switch.show()
  }

  private getTheme() {
    this.dayTheme = this.config.get('workbench.preferredLightColorTheme')
    this.nightTheme = this.config.get('workbench.preferredDarkColorTheme')
  }

  public registerCommand(uri: string, callback: (...args: any[]) => any) {
    let dis = commands.registerCommand(uri, callback)  
    this.context.subscriptions.push(dis)
  }
}