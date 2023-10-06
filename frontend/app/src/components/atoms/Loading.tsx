import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Center h="90vh">
      <Spinner />
    </Center>
  );
};
