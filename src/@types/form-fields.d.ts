export interface IButtonProps {
  onClick: (...arg) => void;
  label: string;
  icon?: (...arg) => JSX.Element;
  className?: classname;
  wrapperClass?: classname;
  iconPre?: boolean;
  iconPost?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  rest?: JSX.IntrinsicElements['button'];
}

export interface IInputProps {
  onChange: (...arg) => void;
  endAdornment?: (...arg) => JSX.Element;
  focusedEvent?: (...arg) => void;
  blurEvent?: (...arg) => void;
  placeholder: string;
  value: string;
  className?: classname;
  labelClass?: classname;
  label?: string;
  wrapperClass?: classname;
  endAdornmentClass?: classname;
  type?: HTMLInputTypeAttribute | undefined;
  rest?: JSX.IntrinsicElements['input'];
}

export interface ITextareaProps {
  onChange: (...arg) => void;
  focusedEvent?: (...arg) => void;
  blurEvent?: (...arg) => void;
  placeholder: string;
  value: string;
  label?: string;
  className?: classname;
  wrapperClass?: classname;
  rest?: JSX.IntrinsicElements['textarea'];
}

export interface ICheckInputProps {
  onChange: (...arg) => void;
  checked: boolean;
  label?: string;
  className?: classname;
  wrapperClass?: classname;
  id: string;
  rest?: JSX.IntrinsicElements['input'];
}

export interface ISelectProps {
  onChange: (...arg) => void;
  focusedEvent?: (...arg) => void;
  blurEvent?: (...arg) => void;
  placeholder: string;
  value: string;
  label?: string;
  className?: classname;
  wrapperClass?: classname;
  showEmpty?: boolean;
  rest?: JSX.IntrinsicElements['select'];
  renderOptions: (...arg) => ReactI18NextChildren | Iterable<ReactI18NextChildren>;
}

export type Option = {
  label: string;
  value: string;
};

export interface MultiSelectProps {
  options: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  labelClass?: string;
  wrapperClass?: string;
  className?: string;
  dependable?: unknown;
  label: string;
  values: string[];
  id: string;
  required?: boolean;
  multi?: boolean;
}
