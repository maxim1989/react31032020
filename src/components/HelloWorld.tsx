import React from 'react';

export interface HelloWorldProps {
  name: string;
}

export class HelloWorld extends React.Component<HelloWorldProps, {}> {
  render() {
    return (
      <h1>
        {`Hello world, ${this.props.name}!`}
      </h1>
    );
  }
}

export default HelloWorld;
