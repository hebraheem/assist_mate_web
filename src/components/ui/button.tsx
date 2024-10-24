import i18n from '../../i18n';
import { IButtonProps } from '../../@types/form-fields';

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
        className={`w-full flex justify-center border-2 ${isError && 'border-red-500'} shadow-sm items-center rounded-lg ${className}`}
        {...rest}
      >
        {icon && iconPre ? icon() : null} {isLoading ? i18n.t('LOADING') : label} {icon && iconPost ? icon() : null}
      </button>
    </div>
  );
};

export default Button;
