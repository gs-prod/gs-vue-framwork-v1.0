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
  content: DemoUser[];
  totalElements: number;
}

interface CommonListsResp {
  code: string;
  message: string;
  result: ListsResult;
}


