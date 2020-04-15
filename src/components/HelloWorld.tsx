import React, { FC } from 'react';

export type HelloWorldProps = {
  name: string;
}

export const HelloWorld: FC<HelloWorldProps> = ({ name }) => (
  <h1>
    {`Hello world, ${name} !`}
  </h1>
);

export default HelloWorld;
