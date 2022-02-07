import { Text } from '@tarojs/components'

export default ({ uri }) => {
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
