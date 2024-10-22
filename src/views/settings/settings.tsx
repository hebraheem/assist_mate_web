import { IUserResponse } from 'src/@types/user';

const Settings = ({ userData, mutate }: { userData: IUserResponse; mutate: any }) => {
  console.log('userData, mutate :>> ', userData, mutate);
  return <div></div>;
};

export default Settings;
