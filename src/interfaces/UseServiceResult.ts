interface UseServiceResult {
  data: Record<string, unknown>;
  isLoading: boolean;
  isError: boolean;
  fetch(): unknown;
}
