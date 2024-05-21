export type TModalType = 'CONFIRMATION' | 'INFORMATION'

export interface IDialog {
  open: boolean
  trigger: HTMLElement | null
  title: string
  message: string
  type: TModalType
  onOkClick: (() => unknown | void) | undefined
  onDismissClick?: (() => unknown | void) | undefined
};

export interface IState {
  id: number
  changing: boolean
  updating: boolean
  focus: boolean
}

export interface IMatrixStates {
  q1: IState[]
  q2: IState[]
  q3: IState[]
  q4: IState[]
}