import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {
  id: Id<"messages">;
};
type ResponseType = Id<"messages"> | null;
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (err: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};
export const useRemoveMessage = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [status, setStatus] = useState<
    "pending" | "error" | "success" | "settled" | "idle"
  >("idle");
  const [error, setError] = useState<Error | null>(null);

  const pending = useMemo(() => status === "pending", [status]);
  const success = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const settled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.messages.remove);
  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      setData(null);
      setStatus("pending");
      try {
        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        setStatus("error");
        setError(err as Error);
        options?.onError?.(err as Error);
        if (options?.throwError) throw err;
      } finally {
        options?.onSettled?.();
        setStatus("settled");
      }
    },
    [mutation]
  );
  return { mutate, data, error, isError, pending, success, settled };
};
