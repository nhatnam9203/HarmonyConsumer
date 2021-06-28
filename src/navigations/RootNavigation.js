// RootNavigation.js

import * as React from "react";
export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();
export function navigate(name, params = {}) {
  if (isMountedRef.current && navigationRef.current) navigationRef.current.navigate(name, params);
}
export function back() {
  if (isMountedRef.current && navigationRef.current) navigationRef.current.goBack();
}
export function reset(routeName, index, params = {}) {
  if (isMountedRef.current && navigationRef.current)
    navigationRef.current.reset({
      index,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    });
}
export function setParams(params = {}) {
  if (isMountedRef.current && navigationRef.current) navigationRef.current.setParams(params);
}
