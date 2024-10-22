import { Dispatch, SetStateAction } from 'react';
import { IUserResponse } from 'src/@types/user';
import Input from 'src/components/forms/Input';
import Textarea from 'src/components/forms/Textarea';
import Button from 'src/components/ui/button';
import { useI18n } from 'src/services/languages/i18fn';

const BasicData = ({
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

  return (
    <div className="overflow-y-auto min-h-full h-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between items-center gap-2">
          <Input
            value={userData?.firstName ?? ''}
            id="firstName"
            label={i18n.msg('FIRST_NAME')}
            wrapperClass="w-full text-black"
            onChange={({ target }) => setUser((prev) => ({ ...prev, firstName: target.value }))}
            placeholder={i18n.msg('FIRST_NAME')}
          />
          <Input
            id="lastName"
            wrapperClass="w-full text-black"
            label={i18n.msg('LAST_NAME')}
            value={userData?.lastName as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, lastName: target.value }))}
            placeholder={i18n.msg('LAST_NAME')}
          />
        </div>
        <div className="flex justify-between items-center gap-2 mt-3">
          <Input
            id="mobile"
            wrapperClass="w-full"
            label={i18n.msg('MOBILE')}
            value={userData?.mobile as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, mobile: target.value }))}
            placeholder={i18n.msg('MOBILE')}
          />
          <Input
            value={userData?.username ?? ''}
            id="userName"
            label={i18n.msg('USER_NAME')}
            wrapperClass="w-full text-black"
            onChange={({ target }) => setUser((prev) => ({ ...prev, username: target.value }))}
            placeholder={i18n.msg('USER_NAME')}
          />
        </div>
        <Input
          id="email"
          disabled
          wrapperClass="w-full mt-3"
          label={i18n.msg('EMAIL')}
          value={userData?.email as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
          placeholder={i18n.msg('EMAIL')}
        />

        <Textarea
          id="bio"
          wrapperClass="w-full mt-3"
          label={i18n.msg('BIO')}
          value={userData?.bio as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, bio: target.value }))}
          placeholder={i18n.msg('BIO')}
        />
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

export default BasicData;
