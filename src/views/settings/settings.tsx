import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Option } from 'src/@types/form-fields';
import { IUserResponse } from 'src/@types/user';
import Input from 'src/components/forms/Input';
import MultiSelect from 'src/components/forms/multi-select';
import Textarea from 'src/components/forms/Textarea';
import Button from 'src/components/ui/button';
import { useI18n } from 'src/services/languages/i18fn';
import { languages } from 'src/utils/constant';

const Settings = ({
  userData,
  mutate,
  setUser,
  isUpdating,
}: {
  userData: IUserResponse;
  mutate: any;
  setUser: Dispatch<SetStateAction<IUserResponse | undefined>>;
  isUpdating: boolean;
}) => {
  const i18n = useI18n();
  const [hobbies, setHobbies] = useState('');

  useEffect(
    () => {
      if (userData?.hobbies?.length) {
        setHobbies(userData?.hobbies.join(','));
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between items-center gap-2 my-3">
          <Input
            id="occupation"
            wrapperClass="w-full text-black"
            label={i18n.msg('OCCUPATION')}
            className="p-3"
            value={userData.settings?.occupation as string}
            placeholder={i18n.msg('OCCUPATION')}
            onChange={({ target }) => {
              setUser((prev) => ({
                ...prev,
                settings: { ...userData.settings, occupation: target.value },
              }));
            }}
          />
          <Input
            id="language"
            wrapperClass="w-full text-black"
            label={i18n.msg('PRIMARY_LANGUAGE')}
            className="p-3"
            value={userData.settings?.language as string}
            placeholder={i18n.msg('PRIMARY_LANGUAGE')}
            onChange={({ target }) => {
              setUser((prev) => ({
                ...prev,
                settings: { ...userData.settings, language: target.value },
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <MultiSelect
            id="languages"
            wrapperClass="w-full"
            values={userData.otherLanguages as string[]}
            placeholder={i18n.msg('OTHER_LANGUAGES')}
            label={i18n.msg('OTHER_LANGUAGES')}
            onChange={(value: Option[]) => {
              setUser((prev) => ({
                ...prev,
                otherLanguages: value.map(({ value }) => value),
              }));
            }}
            options={(languages?.map(({ name }) => ({ label: name, value: name })) as Option[]) ?? []}
          />
        </div>
        <div>
          <Textarea
            id="hobbies"
            wrapperClass="w-full"
            value={hobbies}
            placeholder={i18n.msg('HOBBIES_SEPARATE_BY_COMMA')}
            label={i18n.msg('HOBBIES_SEPARATE_BY_COMMA')}
            onChange={({ target }) => {
              setHobbies(target.value);
              setUser((prev) => ({
                ...prev,
                hobbies: target.value?.split(','),
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

export default Settings;
