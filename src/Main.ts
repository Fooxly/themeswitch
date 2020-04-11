import { Disposable, ExtensionContext, commands, workspace, window, StatusBarAlignment, StatusBarItem, ConfigurationTarget, ThemeColor, ConfigurationChangeEvent, WorkspaceConfiguration, Uri } from 'vscode'

export default class Main {
  public context: ExtensionContext
  private cmds: Map<string, Disposable> = new Map<string, Disposable>()

  private switch?: StatusBarItem
  private config: WorkspaceConfiguration

  private dayTheme?: string
  private dayThemeCustomizations?: object
  private nightTheme?: string
  private nightThemeCustomizations?: object

  constructor(context: ExtensionContext) {
    this.context = context
    this.config = workspace.getConfiguration()
    this.Initialize()
  }

  private async Initialize() {
    this.getTheme()
    // switch to the day theme
    this.registerCommand('themeswitch.daytheme', () => {
      this.config.update('workbench.colorTheme', this.dayTheme, true)
      this.config.update('workbench.colorCustomizations', this.dayThemeCustomizations, true)
    })
    // switch to the night theme
    this.registerCommand('themeswitch.nighttheme', () => {
      this.config.update('workbench.colorTheme', this.nightTheme, true)
      this.config.update('workbench.colorCustomizations', this.nightThemeCustomizations, true)
    })
    // toggle between the themes
    this.registerCommand('themeswitch.toggle', () => {
      const cTheme = this.config.get('workbench.colorTheme')
      if(cTheme === this.dayTheme) {
        this.config.update('workbench.colorTheme', this.nightTheme, true)
      } else if(cTheme === this.nightTheme) {
        this.config.update('workbench.colorTheme', this.dayTheme, true)
      } else {
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
    this.dayTheme = this.config.get('themeswitch.dayTheme')
    this.dayThemeCustomizations = this.config.get('themeswitch.dayCustomizations')
    this.nightTheme = this.config.get('themeswitch.nightTheme')
    this.nightThemeCustomizations = this.config.get('themeswitch.nightCustomizations')
  }

  public registerCommand(uri: string, callback: (...args: any[]) => any) {
    let dis = commands.registerCommand(uri, callback)  
    this.context.subscriptions.push(dis)
  }
}