import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type ResponseType = string | null;
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (err: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};
export const useGenerateUploadUrl = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [status, setStatus] = useState<
    "pending" | "error" | "success" | "settled" | "idle"
  >("idle");
  const [error, setError] = useState<Error | null>(null);

  const pending = useMemo(() => status === "pending", [status]);
  const success = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const settled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.upload.generateUploadUrl);
  const mutate = useCallback(
    async (_values: object, options?: Options) => {
      setData(null);
      setStatus("pending");
      try {
        const response = await mutation();
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
