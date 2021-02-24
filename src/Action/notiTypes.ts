export interface Noti {
  isShowed: Boolean,
  // content: string
}

export const SHOW_NOTI = 'SHOW_NOTI'
export const HIDE_NOTI = 'HIDE_NOTI'

interface SHOW_NOTI {
  type: typeof SHOW_NOTI
  // payload: Noti
}

interface HIDE_NOTI {
  type: typeof HIDE_NOTI
}

export type NotiActionTypes = SHOW_NOTI | HIDE_NOTI