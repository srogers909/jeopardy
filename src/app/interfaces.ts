export interface IClue {
  id?: number
  answer?: string
  question?: string
  value?: number
  airdate?: string
  created_at?: string
  updated_at?: string
  category_id?: number
  game_id?: number
  invalid_count?: number
  category?: ICategory;
  price?: string;
}

export interface ICategory {
  id: number
  title: string
  created_at?: string
  updated_at?: string
  clues_count?: number
  clues?: Array<IClue>
}

export interface ITileOptions {
  category?: ICategory;
  type?: string;
  isClickable?: boolean;
  isSolved?: boolean;  
}

export interface IGameBoard {
  categories: Array<ICategory>;
  clueValues: Array<IClue>;
}

export interface IGameBoardCategory {
  category: ICategory
  clues: Array<IClue>
}

export interface IClueOptions {
  value?: number
  category?: number
  min_date?: string
  max_date?: string
  offset?: number
}

export interface IBoardDimension {
  x: number
  y: number
}

export interface ITileType {
  name: string
}

export interface ModalConfig {
  modalTitle: string
  dismissButtonLabel?: string
  closeButtonLabel?: string
  shouldClose?(): Promise<boolean> | boolean
  shouldDismiss?(): Promise<boolean> | boolean
  onClose?(): Promise<boolean> | boolean
  onDismiss?(): Promise<boolean> | boolean
  disableCloseButton?(): boolean
  disableDismissButton?(): boolean
  hideCloseButton?(): boolean
  hideDismissButton?(): boolean
}