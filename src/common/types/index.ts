import { MutationFunctionOptions } from '@apollo/client';
import { ReactNode, ReactElement } from 'react';

export type DefaultProps = {
  children?: ReactNode | ReactElement;
  window?: Window;
};

export type ResolverMethod = (
  options?: MutationFunctionOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;
