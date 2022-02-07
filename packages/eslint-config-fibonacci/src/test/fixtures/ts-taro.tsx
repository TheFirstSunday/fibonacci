import * as React from 'react';
import { Text } from '@tarojs/components'

import './index.css';

interface LogoProps {
  uri: string;
}

export default ({ uri }: LogoProps) => {
  const test = ['hello', 'world', uri];
  return (
    <>
      {test.map((item) => (
        <Text key={item}>
          { item }
        </Text>
      ))}
    </>
  );
};
