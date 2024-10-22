import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { MultiSelectProps, Option } from '../../@types/form-fields';
import CancelOutlineIcon from '../../constants/svgs/cancel-outline';
import useClickOutside from '../../hooks/use-clickout';
import { separateAndCapitalize } from '../../utils/methods/helpers';

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  labelClass,
  label,
  wrapperClass,
  className,
  id,
  values,
  required,
  placeholder = 'Select items',
  multi = true,
  dependable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const [errorType, setErrorType] = useState({ value: false, valueText: '' });
  const [borderClass, setBorderClass] = useState<string>('border-slate-100');
  const [errorClass, setErrorClass] = useState<string>('border-blue-500');
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  useEffect(
    () => {
      if (isTouched) validate();
    },
    // eslint-disable-next-line
    [selectedItems]
  );

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Check if there's enough space below; if not, open upward
      if (spaceBelow < 200 && spaceAbove > 200) {
        // 200px is an example dropdown height
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  useEffect(
    () => {
      if (values?.length) {
        const selected = options?.filter((item) => {
          // @ts-ignore
          if (values[0]?.value) {
            // @ts-ignore
            const stringValue = values.map(({ value }) => value);
            return stringValue.includes(item.value);
          } else {
            return values.includes(item.value);
          }
        });
        setSelectedItems(selected);
        onChange(selected);
      }
      setFilteredOptions(options);
    },
    // eslint-disable-next-line
    [isOpen, dependable]
  );

  const validate = () => {
    if (!selectedItems?.length && Boolean(required)) {
      setBorderClass('border-red-500');
      setErrorClass('border-red-500');
      setErrorType({
        value: !selectedItems?.length,
        valueText: !selectedItems?.length ? `${separateAndCapitalize(id) ?? 'Value'} is required` : '',
      });
    } else {
      setBorderClass('border-slate-100');
      setErrorClass('border-blue-500');
      setErrorType({ value: false, valueText: '' });
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsTouched(true);
    setIsOpen(!isOpen);
  };

  // Handle checkbox change
  const handleCheckboxChange = (option: Option) => {
    if (!multi) {
      setSelectedItems([option]);
      onChange([option]);
      setIsOpen(false);
      return;
    }
    const isAlreadySelected = selectedItems.some((item) => item.value === option.value);
    let newSelectedItems;

    if (isAlreadySelected) {
      newSelectedItems = selectedItems.filter((item) => item.value !== option.value);
    } else {
      newSelectedItems = [...selectedItems, option];
    }

    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const removeItem = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: Option) => {
    e.stopPropagation();
    const newSelectedItems = selectedItems.filter((opt) => opt.value !== item.value);
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  // Handle filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.toLowerCase()) {
      const filtered = options.filter(({ label }) => label.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  };

  return (
    <div className={`relative ${wrapperClass ?? ''}`} ref={ref}>
      {label && <p className={`pl-2 pb-2 text-sm ${labelClass}`}>{label}</p>}
      {/* Dropdown Toggle Button */}
      <div
        className={`p-2 bg-white cursor-pointer w-full block rounded-lg border-2 shadow-sm ${borderClass} ${errorClass} ${className ?? ''}`}
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
      >
        {selectedItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedItems?.map((item) => (
              <div
                key={item.value}
                data-testid={item.label}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex max-w-max justify-between items-center"
              >
                <span className="mr-1">{item.label}</span>
                <CancelOutlineIcon width="16" height="16" onClick={(e) => removeItem(e, item)} color="white" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-between items-center p-1 text-sm text-slate-300">
            <span>{placeholder}</span>
            <ChevronDown />
          </div>
        )}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className={`absolute mt-2 bg-white border border-gray-300 rounded w-full max-h-64 overflow-y-auto shadow-lg z-30 ${openUpward ? '-top-48' : 'top-10'} transition-all ease-in-out duration-300`}
          ref={dropdownRef}
        >
          <input
            type="search"
            onChange={handleFilterChange}
            placeholder="Search..."
            className="placeholder:text-sm placeholder:text-slate-300 w-full p-2 border-b border-gray-300 focus:outline-none text-black"
          />
          <div>
            {filteredOptions.map((option) => (
              <label key={option.value} className="flex text-black items-center p-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type={!multi ? 'radio' : 'checkbox'}
                  checked={selectedItems.some((item) => item.value === option.value)}
                  onChange={() => handleCheckboxChange(option)}
                  className={`mr-2`}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {errorType.valueText ? <small className="text-red-500 bottom-0 left-2 pt-2">{errorType.valueText}</small> : null}
    </div>
  );
};

export default MultiSelect;
