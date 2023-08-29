import { useNotificationsQuery } from "@/hooks/query";
import { NotificationKind } from "@/server/router/types";
import { useRouter } from "next/router";
import {
  NotificationMentionsType,
  NotificationStartFollowType,
  NotificationCommunityNewMember,
  NotificationPostComment,
  NotificationCommentReply,
} from "@/types/db";

const useNotificationList = () => {
  const router = useRouter();

  const filter = router.query?.filter as string | undefined;
  const isShowUnread = filter === "unread";

  const { data: notifications, isSuccess } =
    useNotificationsQuery(isShowUnread);

  if (!isSuccess) return { isSuccess };

  const flattedNotifications = [
    ...notifications.notificationsStartFollow,

    ...notifications.notificationsPostComment,
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const isNotificationStartFollow = (
    notification: typeof flattedNotifications[number]
  ): notification is NotificationStartFollowType =>
    notification.type === NotificationKind.START_FOLLOW;

  const isNotificationsPostComment = (
    notification: typeof flattedNotifications[number]
  ): notification is NotificationPostComment =>
    notification.type === NotificationKind.POST_COMMENT;

  return {
    isSuccess,
    flattedNotifications,
    isNotificationStartFollow,
    isNotificationsPostComment,
  };
};

export default useNotificationList;
