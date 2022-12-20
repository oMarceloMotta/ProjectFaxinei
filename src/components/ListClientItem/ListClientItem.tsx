import React from 'react';

import { Pressable, Box, Text, Flex } from 'native-base';
import { useAppSelector } from '../../app/appStore';

export function ListClientItem({ item, onPress }: any) {
  const isDark = useAppSelector(state => state.app.isDarkTheme);

  function onPressClient() {
    onPress(item);
  }
  return (
    <Pressable onPress={onPressClient}>
      <Flex direction="row" alignItems="center">
        <Box w="70%" marginTop="2">
          <Text color={isDark ? 'primary.50' : 'muted.900'}>{item.name}</Text>
          <Text color={isDark ? 'primary.50' : 'muted.900'}>{item.phone}</Text>
        </Box>
        <Box>
          <Text color={isDark ? 'primary.50' : 'muted.900'}>
            {item.dateWorked}
          </Text>
        </Box>
      </Flex>
    </Pressable>
  );
}
