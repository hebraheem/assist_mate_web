import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IUserResponse } from 'src/@types/user';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import { useI18n } from 'src/services/languages/i18fn';
import MultiSelect from 'src/components/forms/multi-select';
import { Option } from 'src/@types/form-fields';
import Button from 'src/components/ui/button';
import Input from 'src/components/forms/Input';
import { getCoordinatesFromAddress } from 'src/lib/utils';

const Address = ({
  userData,
  mutate,
  setUser,
  isUpdating,
}: {
  userData: IUserResponse;
  mutate: any;
  setUser: Dispatch<SetStateAction<IUserResponse | undefined>>;
  isUpdating: boolean;
  isPending?: boolean;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [state, setState] = useState<IState[]>();
  const [selectedState, setSelectedState] = useState<IState>();
  const [cities, setCities] = useState<ICity[]>();
  const i18n = useI18n();
  const countries = Country.getAllCountries();

  requestAnimationFrame(() => {
    setSelectedState(state?.find(({ name }) => name === userData?.address?.state));
  });

  useEffect(
    () => {
      if (userData?.address?.country) {
        setSelectedCountry(countries?.find(({ name }) => name === userData?.address?.country));
        setState(State.getStatesOfCountry(selectedCountry?.isoCode));
      }

      if (!cities?.length && userData?.address?.city && selectedCountry && selectedState) {
        setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
      }
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry, userData?.address?.country]);

  useEffect(
    () => {
      if (
        !userData.address?.city ||
        !userData.address?.state ||
        !userData.address?.houseNumber ||
        !userData.address?.city
      )
        return;
      const address = `${userData?.address?.country},${userData?.address?.state},${userData?.address?.city},${userData?.address?.houseNumber}`;
      (async function () {
        const location = await getCoordinatesFromAddress(address);
        setUser((prev) => ({
          ...prev,
          address: { ...userData.address, coordinate: { lat: location?.lat, lng: location?.lng } },
        }));
      })();
    },
    // eslint-disable-next-line
    [userData.address?.city, userData?.address?.state, userData?.address?.houseNumber, userData.address?.city]
  );

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
    }
  }, [selectedState, selectedCountry, userData?.address?.country, userData?.address?.state]);

  if (userData?.address?.city && !cities?.length) return <p>Loading</p>;

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault}>
        <MultiSelect
          multi={false}
          id="nationality"
          wrapperClass="w-full"
          values={[userData?.nationality as string]}
          placeholder={i18n.msg('NATIONALITY')}
          label={i18n.msg('NATIONALITY')}
          onChange={(value) => {
            setUser((prev) => ({ ...prev, nationality: value?.[0]?.value }));
          }}
          options={(countries?.map(({ name }) => ({ label: name, value: name })) as Option[]) ?? []}
        />
        <MultiSelect
          multi={false}
          id="country"
          wrapperClass="w-full my-3"
          values={[userData.address?.country as string]}
          placeholder={i18n.msg('SELECT_COUNTRY')}
          label={i18n.msg('SELECT_COUNTRY')}
          onChange={(value) => {
            if (value?.[0]?.value) {
              setSelectedCountry(countries?.find(({ name }) => name === value[0].value));
              setUser((prev) => ({ ...prev, address: { ...userData.address, country: value[0].value, state: '' } }));
            } else {
              setSelectedCountry(undefined);
              setUser((prev) => ({ ...prev, address: { city: '', country: '', state: '' } }));
            }
          }}
          options={(countries?.map(({ name }) => ({ label: name, value: name })) as Option[]) ?? []}
        />
        <div className="flex justify-between items-center gap-2 my-3">
          <MultiSelect
            multi={false}
            id="state"
            dependable={userData.address?.country}
            wrapperClass="w-full"
            values={[userData.address?.state as string]}
            placeholder={i18n.msg('SELECT_STATE')}
            label={i18n.msg('SELECT_STATE')}
            onChange={(value) => {
              if (value?.[0]?.value) {
                setSelectedState(state?.find(({ name }) => name === value[0].value));
                setUser((prev) => ({ ...prev, address: { ...userData.address, state: value[0].value } }));
              } else {
                setSelectedState(undefined);
                setCities([]);
                setUser((prev) => ({ ...prev, address: { ...userData.address, state: '', city: '' } }));
              }
            }}
            options={(state?.map(({ name }) => ({ label: name, value: name })) as Option[]) ?? []}
          />
          <MultiSelect
            multi={false}
            id="city"
            wrapperClass="w-full"
            dependable={userData.address?.state}
            values={[userData.address?.city as string]}
            placeholder={i18n.msg('SELECT_CITY')}
            label={i18n.msg('SELECT_CITY')}
            onChange={(value) => {
              setUser((prev) => ({ ...prev, address: { ...userData.address, city: value?.[0]?.value } }));
            }}
            options={(cities?.map(({ name }) => ({ label: name, value: name })) as Option[]) ?? []}
          />
        </div>
        <div className="flex justify-between items-center gap-2 my-3">
          <Input
            id="street"
            wrapperClass="w-full text-black"
            label={i18n.msg('STREET')}
            className="p-3"
            value={userData.address?.street as string}
            placeholder={i18n.msg('STREET')}
            onChange={({ target }) => {
              setUser((prev) => ({
                ...prev,
                address: { ...userData.address, street: target.value },
              }));
            }}
          />
          <Input
            id="houseNumber"
            wrapperClass="w-full text-black"
            label={i18n.msg('HOUSE_NUMBER')}
            className="p-3"
            value={userData.address?.houseNumber as string}
            placeholder={i18n.msg('HOUSE_NUMBER')}
            onChange={({ target }) => {
              setUser((prev) => ({
                ...prev,
                address: { ...userData.address, houseNumber: target.value },
              }));
            }}
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            isLoading={isUpdating}
            disabled={isUpdating}
            className="p-2 bg-blue-500 text-white hover:bg-blue-500"
            label={i18n.msg('UPDATE')}
            onClick={() => mutate({ data: userData, updateOtherData: true })}
          />
        </div>
      </form>
    </div>
  );
};

export default Address;
