import { useEffect, useState } from 'react';
import Input from './Input';
import Button from '../button';
import useClickOutside from '../../hooks/use-clickout';

const Autocomplete = ({
  wrapperClass,
  renderList,
  data,
  id,
}: {
  wrapperClass: string;
  id: string;
  data: { key: string; value: string }[];
  renderList: (arg: typeof data) => JSX.Element[];
}) => {
  const [search, setSearch] = useState('');
  // const [selections, setSelections] = useState<(string | number | undefined)[]>([]);
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState<typeof data>();
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  useEffect(
    () => {
      setFilterData(data);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className={`backdrop-sepia-0 bg-white/30 ${wrapperClass}`} id={`autocomplete_${id}`} ref={ref}>
      <div className="w-full rounded-lg flex justify-between items-center">
        <Input
          wrapperClass="w-full"
          required
          id={id}
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
            const resp = target.value
              ? data?.filter((item) => item.value.toLowerCase().includes(target?.value?.toLowerCase()))
              : data;
            setFilterData(resp);
          }}
          focusedEvent={() => {
            setOpen(true);
          }}
          placeholder="Something..."
          className="w-full border-r-0 rounded-l-lg"
          endAdornment={() => (
            <Button
              id={`${id}_btn`}
              onClick={() => setOpen(!open)}
              className="rounded-l-none w-16"
              label=""
              iconPre
              icon={() =>
                open ? (
                  <span className="material-symbols-outlined">u</span>
                ) : (
                  <span className="material-symbols-outlined">i</span>
                )
              }
            />
          )}
        />
      </div>
      {open && (
        <div className="h-auto border-[3px] border-t-0 border-white rounded-b-lg p-2 bg-white shadow-lg">
          {renderList(filterData as typeof data)}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
