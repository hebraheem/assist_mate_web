import { IButtonProps } from '../@types/form-fields';

const Button = ({
  label,
  onClick,
  wrapperClass,
  className,
  icon,
  iconPre,
  iconPost,
  isError,
  isLoading,
  ...rest
}: IButtonProps & JSX.IntrinsicElements['button']) => {
  return (
    <div className={`${wrapperClass}`}>
      <button
        onClick={onClick}
        className={`w-full flex justify-center border-2 ${isError ? 'border-red-500' : `border-slate-100`} shadow-sm bg-transparent items-center rounded-lg hover:bg-slate-50 ${className}`}
        {...rest}
      >
        {icon && iconPre ? icon() : null} {label ?? ''} {icon && iconPost ? icon() : null}
        {isLoading && 'loading...'}
      </button>
    </div>
  );
};

export default Button;
