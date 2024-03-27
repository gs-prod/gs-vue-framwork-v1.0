interface ViewTag {
  router: RouteLocationNormalizedLoaded;
  title: string;
}

interface LabelList {
  label: string;
  prop: string;
}

interface CommonResp<T> {
  code: string;
  message: string;
  result: T;
}

interface ListsResult {
  records: DemoUser[];
  total: number;
}

interface CommonListsResp {
  code: string;
  message: string;
  result: ListsResult;
}
