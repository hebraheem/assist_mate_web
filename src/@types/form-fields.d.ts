export interface IButtonProps {
  onClick: (...arg) => void;
  label: string;
  icon?: (...arg) => JSX.Element;
  className?: string;
  wrapperClass?: HTMLAttributes<HTMLDivElement>['className'];
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
  className?: string;
  label?: string;
  wrapperClass?: string;
  endAdornmentClass?: string;
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
  className?: string;
  wrapperClass?: string;
  rest?: JSX.IntrinsicElements['textarea'];
}

export interface ISelectProps {
  onChange: (...arg) => void;
  focusedEvent?: (...arg) => void;
  blurEvent?: (...arg) => void;
  placeholder: string;
  value: string;
  label?: string;
  className?: string;
  wrapperClass?: string;
  showEmpty?: boolean;
  rest?: JSX.IntrinsicElements['select'];
  renderOptions: (...arg) => ReactI18NextChildren | Iterable<ReactI18NextChildren>;
}
