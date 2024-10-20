import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { IInputProps } from '../../@types/form-fields';
import { separateAndCapitalize, validateInput } from '../../utils/methods/helpers';
import Button from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  onChange,
  placeholder,
  value,
  className,
  wrapperClass,
  focusedEvent,
  blurEvent,
  endAdornment,
  type,
  label,
  labelClass,
  endAdornmentClass,
  ...rest
}: IInputProps & Omit<JSX.IntrinsicElements['input'], 'type'>) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute | undefined>('text');
  const [errorType, setErrorType] = useState({ value: false, valueText: '', pattern: false, patternText: '' });
  const [borderClass, setBorderClass] = useState<string>('border-slate-100');
  const [errorClass, setErrorClass] = useState<string>('focus:border-blue-500');
  const { required, pattern, id } = rest;

  useEffect(
    () => {
      if (isTouched) validate();
    },
    // eslint-disable-next-line
    [value]
  );

  useEffect(
    () => {
      if (type !== 'password') return;
      setInputType(showPassword ? 'text' : 'password');
    },
    // eslint-disable-next-line
    [type, showPassword]
  );

  const validate = () => {
    if ((!value || (!validateInput(value, pattern as any) && pattern !== undefined)) && Boolean(required)) {
      setBorderClass('border-red-500');
      setErrorClass('focus:border-red-500');
      setErrorType({
        value: !value,
        pattern: !validateInput(value, pattern as any) && pattern !== undefined,
        valueText: !value ? `${separateAndCapitalize(id) ?? 'Value'} is required` : '',
        patternText:
          !validateInput(value, pattern as any) && pattern !== undefined
            ? `${separateAndCapitalize(id) ?? 'Value'} does not match specified pattern`
            : '',
      });
    } else {
      setBorderClass('border-slate-100');
      setErrorClass('border-blue-500');
      setErrorType({ value: false, pattern: false, valueText: '', patternText: '' });
    }
  };

  const _endAdornment = () => {
    if (type !== 'password') return null;
    return (
      <Button
        id={`${id}_btn`}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
        className={`rounded-l-none w-16 shadow-sm p-2 bg-white ${borderClass} ${errorClass}`}
        label=""
        type="button"
        isError={(!value || (!validateInput(value, pattern as any) && pattern !== undefined)) && Boolean(required)}
        iconPre
        icon={() => (showPassword ? <EyeOff /> : <Eye />)}
      />
    );
  };

  return (
    <div className={`relative ${wrapperClass ?? ''}`}>
      {label && <p className={`pl-2 pb-2 text-sm ${labelClass}`}>{label}</p>}
      <div className={`flex justify-between items-start ${endAdornmentClass ?? ''}`}>
        <input
          onFocus={(evt) => {
            setIsTouched(true);
            if (focusedEvent) focusedEvent(evt);
          }}
          onBlur={(evt) => {
            setIsTouched(false);
            if (blurEvent) blurEvent(evt);
            validate();
          }}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          data-testid={id}
          className={`p-2 placeholder:text-sm placeholder:text-slate-300 w-full block rounded-lg ${endAdornment || type === 'password' ? 'border-r-0 border-2 rounded-r-none' : 'border-2 shadow-sm'} ${borderClass} ${errorClass} ${className ?? ''}`}
          {...rest}
        />
        {endAdornment && endAdornment()}
        {_endAdornment()}
      </div>
      {errorType.valueText ? <small className="text-red-500 bottom-0 left-2 pt-2">{errorType.valueText}</small> : null}
      {errorType.valueText && errorType.patternText ? <br /> : null}
      {errorType.patternText ? (
        <small className="text-red-500 bottom-0 left-2 pt-2">{errorType.patternText}</small>
      ) : null}
    </div>
  );
};

export default Input;
