export type TModalType = 'CONFIRMATION' | 'INFORMATION'
export interface IDialog {
  open: boolean,
  title: string,
  message: string,
  type: TModalType,
  onOkClick: ((args: unknown[] | undefined) => unknown | void) | undefined
};