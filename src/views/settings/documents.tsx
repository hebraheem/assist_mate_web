import { IUserResponse } from 'src/@types/user';

const Documents = ({ userData, mutate }: { userData: IUserResponse; mutate: any }) => {
  console.log('userData, mutate :>> ', userData, mutate);
  return <div></div>;
};

export default Documents;
