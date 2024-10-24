import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Dispatch, SetStateAction, useRef } from 'react';
import { IUserResponse } from 'src/@types/user';
import { auth, storage } from 'src/services/firebase';
import { useI18n } from 'src/services/languages/i18fn';

const Documents = ({
  userData,
  mutate,
  setUser,
  // isUpdating,
}: {
  userData: IUserResponse;
  mutate: any;
  setUser: Dispatch<SetStateAction<IUserResponse | undefined>>;
  isUpdating: boolean;
}) => {
  const i18n = useI18n();
  const fileRef = useRef<any>(null);

  const handleFileOpen = () => {
    if (fileRef?.current) {
      fileRef.current.click();
    }
  };

  const handleUploadFiles = async (e: any) => {
    const files = e.target.files as File[];
    const fileUrls: string[] = [];

    if (files?.length) {
      const user = auth.currentUser;
      for (const file of Array.from(files)) {
        const fileRef = ref(storage, `documents/${user?.uid}/?name=${file?.name}&size=${file?.size}`);
        await uploadBytesResumable(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);
        fileUrls.push(fileUrl);
      }

      const updatedUserData = {
        ...userData,
        settings: {
          ...userData.settings,
          documents: [...(userData.settings?.documents as []), ...fileUrls],
        },
      };
      updateUser(updatedUserData);
    }
  };

  const updateUser = (updatedUser: IUserResponse) => {
    setUser(updatedUser);
    mutate({ data: updatedUser, updateOtherData: true });
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault}>
        <div>
          {userData.settings?.documents?.map((doc: unknown) => {
            const docUrl = new URL(decodeURIComponent(doc as string));
            const name = docUrl.searchParams.get('name');
            const size = docUrl.searchParams.get('size')?.split('?')[0];
            return (
              <div
                key={doc as string}
                className="w-full flex justify-between items-center bg-white shadow-lg border-2 border-slate-400 rounded-lg h-28 mb-2 px-2"
              >
                <div className="flex items-center">
                  <img src={doc as string} alt="doc" className="h-full max-w-32 object-cover rounded-lg" />
                  <div>
                    <p>
                      {i18n.msg('NAME')}: {name}
                    </p>
                    <p>
                      {i18n.msg('SIZE')}: {size}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button onClick={() => console.log('object :>> ')} type="button">
                    <img
                      src="https://img.icons8.com/?size=100&id=986&format=png&color=000000"
                      alt="view"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    onClick={() => {
                      const newDocs = userData.settings?.documents?.filter((d) => d !== doc);
                      const updatedUserData = {
                        ...userData,
                        settings: {
                          ...userData.settings,
                          documents: newDocs,
                        },
                      };
                      updateUser(updatedUserData);
                    }}
                    type="button"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000"
                      alt="delete"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
            );
          })}
          <div
            className="w-full border-2 p-3 border-dotted shadow-lg border-slate-500 rounded-lg text-center"
            onClick={handleFileOpen}
            onKeyDown={handleFileOpen}
            tabIndex={0}
            role="button"
          >
            <p>Drag and drop files or click to upload file(s)</p>
            <img
              src="https://img.icons8.com/?size=100&id=47858&format=png&color=000000"
              alt="download"
              className="m-auto"
            />
          </div>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            multiple
            accept=".jpeg,.png,.pdf,.docx,xlsx,.jpg"
            onChange={handleUploadFiles}
          />
        </div>

        {/* <div className={`${!userData.settings?.documents?.length && 'hidden'} flex justify-end mt-3`}>
          <Button
            isLoading={isUpdating}
            disabled={isUpdating}
            className="p-2 bg-blue-500 text-white hover:bg-blue-500"
            label={i18n.msg('UPDATE')}
            onClick={handleUploadFiles}
          />
        </div> */}
      </form>
    </div>
  );
};

export default Documents;
