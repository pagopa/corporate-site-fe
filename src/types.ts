export namespace PagoPA {
  export enum MENU {
    RESERVED_MENU = 'ReservedMenu',
    MAIN_MENU = 'MainMenu',
    FOOTER_TOP = 'FooterTop',
    FOOTER_BOTTOM = 'FooterBottom',
  }

  export type BlockConfig = Record<'Standard' | 'Wide', string>;
}
