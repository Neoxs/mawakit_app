//  ==============================================================================
//  Props
// ===============================================================================

//  ==============================================================================
export interface OptionType {
  value: string;
  label: string;
}

// ==============================================================================
// Events
// =============================================================================

export type ReactChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactSubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement>;
export type ReactClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ReactClickEventHandler = React.MouseEventHandler<HTMLButtonElement>;
