import { useEffect, useState } from 'react';
import { ICheckInputProps } from '../../@types/form-fields';
import { separateAndCapitalize } from '../../utils/methods/helpers';

const CheckBox = ({
  onChange,
  checked,
  className,
  wrapperClass,
  label,
  id,
  ...rest
}: ICheckInputProps & JSX.IntrinsicElements['input']) => {
  const [errorType, setErrorType] = useState({ value: false, valueText: '' });
  const [isDirty, setIsDirty] = useState(false);
  const { required } = rest;

  useEffect(
    () => {
      if (required && isDirty) validate();
    },
    // eslint-disable-next-line
    [checked, isDirty]
  );

  const validate = () => {
    if (!checked && Boolean(required)) {
      setErrorType({
        value: !checked,
        valueText: !checked ? `${separateAndCapitalize(id) ?? 'Value'} is required` : '',
      });
    } else {
      setErrorType({ value: false, valueText: '' });
    }
  };

  return (
    <div className={`${wrapperClass}`}>
      <div className={`flex justify-start items-center gap-2 pb-2 `}>
        <input
          id={id}
          type="checkbox"
          onChange={(e) => {
            setIsDirty(true);
            if (onChange) onChange(e);
          }}
          checked={checked}
          className={`border-2 shadow-sm rounded-lg ${className ?? ''}`}
          {...rest}
        />
        <label htmlFor={id} className="pl-1 text-sm">
          {label}
        </label>
      </div>
      {errorType.valueText ? <small className="text-red-500 bottom-0 left-2">{errorType.valueText}</small> : null}
    </div>
  );
};

export default CheckBox;
