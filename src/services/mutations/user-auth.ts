import { useMutation } from '@tanstack/react-query';
import { IOpt } from '../../@types/tan-stack';
import { createUser, login } from '../serviceFn/users';

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
