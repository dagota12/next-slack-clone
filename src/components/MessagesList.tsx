import { GetMessagesReturnType } from "@/features/messages/api/useGetMessages";
import { format, isToday, isYesterday } from "date-fns";
import { Message } from "./Message";
interface MessagesListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreaationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}
const formatDateLable = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  }
  return format(date, "EEEE,MMMM d");
};

export const MessagesList = ({
  memberName,
  memberImage,
  channelName,
  channelCreaationTime,
  variant,
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessagesListProps) => {
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );
  return (
    <div className="flex flex-1 flex-col-reverse pb-4 overflow-y-auto  messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center y-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative bg-white  inline-block px-2.5 py-0.5 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLable(dateKey)}
            </span>
          </div>
          {messages.map((message) => (
            <Message
              key={message._id}
              id={message._id}
              isAuthor={false}
              isEditing={false}
              setEditingId={() => {}}
              isCompact={false}
              hideThreadButton={true}
              memberId={message.memberId}
              authorImage={message.user.image}
              authorName={message.user.name}
              reactions={message.reactions}
              body={message.body}
              image={message.image}
              createdAt={message._creationTime}
              updatedAt={message.updatedAt}
              threadCount={message.threadCount}
              threadImage={message.threadImage}
              threadTimestamp={message.threadTimestamp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
