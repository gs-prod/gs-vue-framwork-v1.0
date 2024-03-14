import { readonly } from "vue";
// @ts-ignore
import { _fetch } from "/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/fetch";
import {
  jsonPointerGet,
  useTypedBackendConfig,
  // @ts-ignore
} from "/node_modules/@sidebase/nuxt-auth/dist/runtime/helpers";
// @ts-ignore
import { getRequestURLWN } from "/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/callWithNuxt";
import type { SessionData } from "#auth";
import { useNuxtApp, useRuntimeConfig, nextTick, navigateTo } from "#imports";
import type {
  SignInFunc,
  GetSessionFunc,
  GetSessionOptions,
  UseAuthReturn,
  SecondarySignInOptions,
  // @ts-ignore
} from "/node_modules/@sidebase/nuxt-auth/dist/runtime/types";

type Credentials = {
  username?: string;
  email?: string;
  password?: string;
} & Record<string, any>;

const signIn: SignInFunc<Credentials, any> = async (
  credentials: [],
  signInOptions: SecondarySignInOptions,
  signInParams: Record<string, string>,
) => {
  const nuxt = useNuxtApp();

  const config = useTypedBackendConfig(useRuntimeConfig(), "local");
  const { path, method } = config.endpoints.signIn;
  const response = await _fetch<Record<string, any>>(nuxt, path, {
    method,
    body: {
      ...credentials,
      ...(signInOptions ?? {}),
    },
    params: signInParams ?? {},
  });

  // login failure notify
  if (response.code !== "10000") {
    ElNotification({
      title: "登录失败",
      message: response.message,
      type: "error",
    });
    return;
  }

  const extractedToken = jsonPointerGet(
    response,
    config.token.signInResponseTokenPointer,
  );
  if (typeof extractedToken !== "string") {
    console.error(
      `Auth: string token expected, received instead: ${JSON.stringify(extractedToken)}. Tried to find token at ${config.token.signInResponseTokenPointer} in ${JSON.stringify(response)}`,
    );
    return;
  }

  const { rawToken } = useAuthState();
  rawToken.value = extractedToken;

  await nextTick(getSession);

  const { callbackUrl, redirect = true, external } = signInOptions ?? {};
  if (redirect) {
    const urlToNavigateTo = callbackUrl ?? (await getRequestURLWN(nuxt));
    return navigateTo(urlToNavigateTo, { external });
  }
};

const getSession: GetSessionFunc<SessionData | null | void> = async (
  getSessionOptions: GetSessionOptions,
) => {
  const nuxt = useNuxtApp();

  const config = useTypedBackendConfig(useRuntimeConfig(), "local");
  const { path, method } = config.endpoints.getSession;
  const { data, loading, lastRefreshedAt, token, rawToken } = useAuthState();

  if (!token.value && !getSessionOptions?.force) {
    return;
  }

  const headers = new Headers(
    token.value
      ? ({ [config.token.headerName]: token.value } as HeadersInit)
      : undefined,
  );

  loading.value = true;
  try {
    data.value = await _fetch<SessionData>(nuxt, path, { method, headers });
  } catch {
    // Clear all data: Request failed so we must not be authenticated
    data.value = null;
    rawToken.value = null;
  }
  loading.value = false;
  lastRefreshedAt.value = new Date();

  const {
    required = false,
    callbackUrl,
    onUnauthenticated,
    external,
  } = getSessionOptions ?? {};
  if (required && data.value === null) {
    if (onUnauthenticated) {
      return onUnauthenticated();
    } else {
      await navigateTo(callbackUrl ?? (await getRequestURLWN(nuxt)), {
        external,
      });
    }
  }

  return data.value;
};

export const sideBaseUseAuth = (): UseAuthReturn => {
  const { data, status, lastRefreshedAt, token } = useAuthState();

  const getters = {
    status,
    data: readonly(data),
    lastRefreshedAt: readonly(lastRefreshedAt),
    token: readonly(token),
  };

  const actions = {
    getSession,
    signIn,
  };

  return {
    ...getters,
    ...actions,
  };
};
