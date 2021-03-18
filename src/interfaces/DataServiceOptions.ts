export interface DataServiceOptions {
  lazy?: boolean;
  onCompleted?(result: unknown): void;
  args?: Array<any>;
}
