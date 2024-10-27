"use client";
import { useGetChannel } from "@/features/channels/api/useGetChannel";
import { useChannelId } from "@/hooks/useChannelId";
import { AlertTriangleIcon, Loader } from "lucide-react";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";
import { useGetMessages } from "@/features/messages/api/useGetMessages";
import { MessagesList } from "@/components/MessagesList";

const ChannelPage = () => {
  const channelId = useChannelId();
  const { data: channel, loading: channelLoading } = useGetChannel({
    id: channelId,
  });
  const { results, status, loadMore } = useGetMessages({ channelId });
  console.log(results);

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex flex-1 flex-col gap-2 items-center justify-center">
        <Loader className="animate-spin size-5" />
      </div>
    );
  }
  if (!channel) {
    return (
      <div className="h-full flex flex-1 flex-col gap-2 items-center justify-center">
        <AlertTriangleIcon className="size-5 mr-2 text-red-500" />
        <span className="text-sm text-muted-foreground">
          channel not found!
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessagesList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        variant="channel"
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placehoder={`Message #${channel.name}`} />
    </div>
  );
};

export default ChannelPage;
