interface ViewTag {
  router: RouteLocationNormalizedLoaded;
  title: string;
}

interface LabelList {
  label: string;
  prop: string;
}

interface DemoResp {
  code: string;
  message: string;
  result: DemoResult;
}

interface DemoResult {
  content: DemoUser[];
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
