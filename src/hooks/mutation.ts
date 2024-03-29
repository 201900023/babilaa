import reloadSession from "src/utils/auth";
import { trpc, inferMutationInput } from "../utils/trpc";

const invalidateAll = (utils: any) => {
  utils.invalidateQueries(["post.getInfiniteFeed"]);
  utils.invalidateQueries(["post.getAll"]);
  utils.invalidateQueries(["post.getById"]);
};

export const useProfileMutation = (onSuccessCb: () => void) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["user.update"], {
    onSuccess() {
      invalidateAll(utils);
      utils.invalidateQueries(["user.getById"]);
      reloadSession();
      onSuccessCb();
    },
  });

  return mutation.mutate;
};

export const useAddCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.add"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
      utils.invalidateQueries(["post.getById", { postId }]);
      invalidateAll(utils);
    },
  });

  return (args: Omit<inferMutationInput<"comment.add">, "postId">) => {
    mutation.mutate({ postId, ...args });
  };
};

export const useAddPostMutation = (onSuccessCb?: () => void) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("post.addPost", {
    onSuccess() {
      if (onSuccessCb) {
        onSuccessCb();
      }
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};

export const useToggleCommentLikeMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.toggleLike"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
    },
  });

  return mutation.mutate;
};

export const useDeleteCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.delete"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
      utils.invalidateQueries(["post.getById", { postId }]);
    },
  });

  return mutation.mutate;
};

export const useUpdateCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.update"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
    },
  });
  return mutation.mutate;
};

export const useToggleFollowUserMutation = (
  userId: string,
  onSuccessCb: () => void
) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("user.followUser", {
    onSuccess() {
      utils.invalidateQueries(["user.getById"]);

      utils.invalidateQueries(["user.getFollowers"]);
      utils.invalidateQueries(["user.getFollowing"]);
      onSuccessCb();
    },
  });

  return () => mutation.mutate({ userId });
};

export const useTogglePostLikeMutation = () => {
  //access tool from trpc
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("post.toggleLike", {
    onSuccess() {
      //refresh the app to show changes
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};

export const useRemovePostMutation = () => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("post.remove", {
    onSuccess() {
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};

export const useToggleUserShareMutation = (onSuccessCb: () => void) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["post.toggleShare"], {
    onSuccess() {
      invalidateAll(utils);
      onSuccessCb();
    },
  });

  return mutation.mutate;
};

export const useMarkNotificationAsRead = () => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["notification.markAsRead"], {
    onSuccess() {
      utils.invalidateQueries(["notification.count"]);
      utils.invalidateQueries(["notification.getAll"]);
    },
  });
  return mutation.mutate;
};

export const useMarkAllNotificationAsRead = () => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["notification.markAllAsRead"], {
    onSuccess() {
      utils.invalidateQueries(["notification.count"]);
      utils.invalidateQueries(["notification.getAll"]);
    },
  });
  return mutation.mutate;
};
