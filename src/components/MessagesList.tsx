import { GetMessagesReturnType } from "@/features/messages/api/useGetMessages";

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
  return (
    <div className="flex flex-1 flex-col-reverse pb-4 overflow-y-auto  messages-scrollbar">
      {data?.map((message) => JSON.stringify(message))}
    </div>
  );
};
