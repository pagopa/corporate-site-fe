export enum PAGOPA_MENU {
  RESERVED_MENU = 'ReservedMenu',
  MAIN_MENU = 'MainMenu',
  FOOTER_TOP = 'FooterTop',
  FOOTER_BOTTOM = 'FooterBottom',
}

export type PagoPABlockConfig = Record<'Standard' | 'Wide', string>;
