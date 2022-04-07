import React from 'react';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const Deposit = () => {
  const props = useProps();

  return <Layout {...props} />;
};
