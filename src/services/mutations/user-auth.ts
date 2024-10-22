import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { IOpt, ITanQuery } from '../../@types/tan-stack';
import {
  confirmRestPassword,
  createUser,
  getUser,
  login,
  restPassword,
  updateUserEmail,
  updateUserPassword,
  updateUserPhone,
  updateUserProfile,
  verifyEmail,
} from '../serviceFn/users';

//** user mutation */
export function useCreateWithEmail(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useSignWithEmail(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useSendResetPasswordLink(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: restPassword,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useConfirmRestPassword(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: confirmRestPassword,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useVerifyEmail(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}
export function useUpdateUserEmail(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: updateUserEmail,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useUpdateUser(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useUpdateUserPassword(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

export function useUpdateUserPhone(opt: IOpt) {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: updateUserPhone,
    onSuccess: (data, variables, context) => opt?.onSuccess && opt?.onSuccess(data, variables, context),
    onError: (error) => opt?.onError && opt?.onError(error),
  });

  return { mutate, isError, isPending };
}

//** user queries */
export function useGetUser(opt?: ITanQuery, queryClient?: QueryClient) {
  const { data, isError, isPending, ...rest } = useQuery(
    {
      queryKey: ['GET_USER'],
      queryFn: getUser,
      ...opt,
    },
    queryClient
  );

  return { data, isError, isPending, rest };
}
