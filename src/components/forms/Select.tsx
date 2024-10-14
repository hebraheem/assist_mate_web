import { useEffect, useState } from 'react';
import { ISelectProps } from '../../@types/form-fields';
import { separateAndCapitalize } from '../../utils/methods/helpers';

const Select = ({
  onChange,
  value,
  className,
  wrapperClass,
  focusedEvent,
  blurEvent,
  renderOptions,
  showEmpty,
  label,
  ...rest
}: ISelectProps & JSX.IntrinsicElements['select']) => {
  const [isTouched, setIsTouched] = useState(false);
  const [errorType, setErrorType] = useState({ value: false, valueText: '' });
  const [borderClass, setBorderClass] = useState<string>('border-slate-100');
  const [errorClass, setErrorClass] = useState<string>('border-blue-500');
  const { required, id } = rest;

  useEffect(
    () => {
      if (isTouched) validate();
    },
    // eslint-disable-next-line
    [value]
  );

  const validate = () => {
    if (!value && Boolean(required)) {
      setBorderClass('border-red-500');
      setErrorClass('border-red-500');
      setErrorType({
        value: !value,
        valueText: !value ? `${separateAndCapitalize(id) ?? 'Value'} is required` : '',
      });
    } else {
      setBorderClass('border-slate-100');
      setErrorClass('border-blue-500');
      setErrorType({ value: false, valueText: '' });
    }
  };

  return (
    <div className={`relative ${wrapperClass}`}>
      {label && <p className="pl-2 pb-2 text-sm">{label}</p>}
      <select
        onFocus={(evt) => {
          setIsTouched(true);
          if (focusedEvent) focusedEvent(evt);
        }}
        onBlur={(evt) => {
          setIsTouched(false);
          validate();
          if (blurEvent) blurEvent(evt);
        }}
        onChange={onChange}
        value={value}
        className={`p-3 placeholder:text-sm placeholder:text-slate-300 w-full border-2 shadow-sm ${borderClass} focus:${errorClass} rounded-lg ${className ?? ''}`}
        {...rest}
        data-testid={id}
      >
        {showEmpty ? <option></option> : null}
        {renderOptions()}
      </select>
      {errorType.valueText ? <small className="text-red-500 bottom-0 left-2 pt-2">{errorType.valueText}</small> : null}
    </div>
  );
};

export default Select;
