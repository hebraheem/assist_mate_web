import { useRef } from 'react';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For Firebase Storage

import { IUserResponse } from 'src/@types/user';
import Tabs from 'src/components/ui/tab';
import { useI18n } from 'src/services/languages/i18fn';
import { useGetUser, useUpdateUser } from 'src/services/mutations/user-auth';
import { noUserImage } from 'src/utils/constant';
import { storage } from 'src/services/firebase';
import useAuthentication from 'src/auth/useAuthentication';
import usePullToRefresh from 'src/components/ui/pull-refresh';

const Settings = () => {
  const { data, isPending, rest } = useGetUser();
  const { user: authUser } = useAuthentication();
  const i18n = useI18n();
  const pullRef = useRef<any>();
  usePullToRefresh(pullRef, () => rest.refetch());
  const { mutate, isPending: isUpdating } = useUpdateUser({
    onSuccess: () => {
      toast.success(i18n.msg('USER_DATA_UPDATED'));
      rest.refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const user = data as IUserResponse;
  const fileInputRef = useRef<any>();

  const tabItems = [
    {
      label: 'Basic data',
      content: <div>Basic data setting!</div>,
    },
    {
      label: 'Address and location',
      content: <div>About us section content here.</div>,
    },
    {
      label: 'Advanced settings',
      content: <div>Here are the services we offer.</div>,
    },
    {
      label: 'Documents',
      content: <div>Feel free to contact us anytime!</div>,
    },
  ];

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleFileChange = async (event: any) => {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0];
      const copiedData = structuredClone(data) as IUserResponse;
      const storageRef = ref(storage, `profilePhotos/${user.uid}/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        copiedData.photoURL = downloadURL;
        mutate({ data: copiedData, updateOtherData: false });
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="md:max-w-[80%] m-auto relative" ref={pullRef}>
      <div className="flex bg-white md:h-[30vh] h-[21vh] m-2 shadow-lg bg-opacity-45 rounded-lg">
        <div className="md:h-[250px] h-[140px] md:w-[250px] w-[140px]  my-auto">
          <img
            src={authUser?.photoURL ?? user?.photoURL ?? noUserImage}
            alt="user_image"
            className="relative rounded-full h-[90%] w-full m-2"
          />
          <button
            onClick={handleButtonClick}
            className="absolute top-5 left-10 bg-gray-300 rounded-full text-center"
            disabled={isUpdating}
          >
            <img
              src="https://img.icons8.com/?size=100&id=8192&format=png&color=000000"
              alt="edit_icon"
              className="w-8 h-8 p-2"
            />
          </button>
        </div>
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileInputRef}
          className="absolute top-0 hidden"
          accept=".png,.jpeg,.jpg"
        />
        <div>{}</div>
      </div>
      <Tabs
        mainWrapperClass="p-2"
        labelWrapperClass="md:min-h-[58vh] max-h-max justify-center bg-white bg-opacity-45 shadow-md rounded-lg"
        tabs={tabItems}
        contentClass="bg-white rounded-lg bg-opacity-45 shadow-md md:h-[58vh] h-[53vh]"
      />
    </div>
  );
};

export default Settings;
