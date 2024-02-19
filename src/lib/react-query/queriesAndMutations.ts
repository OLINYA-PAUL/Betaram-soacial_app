import {
    useQuery,
    useMutation,
    useQueryClient,
    // useInfiniteQuery
  } from '@tanstack/react-query'

  import {createUserAccount, signInAccount, SignOutAccount, createPost, getRecentPosts} from "../appwrite/api"
  import INewUser from '../../../types'
  import {QUERY_KEYS} from './queryKeys'

  export const useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: INewUser) => createUserAccount(user),
    });
  }
  
  export const useSignInAcccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  } 

  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: SignOutAccount 
    });
  } 

  export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        });
      },
    });
  };

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};