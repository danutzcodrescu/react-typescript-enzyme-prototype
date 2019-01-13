import * as React from 'react';
interface Props {
  message: string;
}

export function ErrorComponent({ message }: Props) {
  return <h1>{message}</h1>;
}
