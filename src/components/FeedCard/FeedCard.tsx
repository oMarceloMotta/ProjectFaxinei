import {
  AspectRatio,
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { FeedCardProps } from '../../types';
import { useAppSelector } from '../../app/appStore';

export function FeedCard({ imageSrc, content, title }: FeedCardProps) {
  const isDark = useAppSelector(state => state.app.isDarkTheme);

  return (
    <Center
      bg={isDark ? 'coolGray.800' : 'warmGray.50'}
      paddingBottom={2}
      borderBottomWidth="1">
      <AspectRatio paddingTop="0" ratio={320 / 160} width="full">
        <Image
          resizeMode="cover"
          alt={title}
          source={{
            uri: imageSrc,
          }}
        />
      </AspectRatio>
      <VStack divider={<Divider />}>
        <Text color={isDark ? 'primary.50' : 'muted.900'} px="4" pt="4">
          {title}
        </Text>
        <Text color={isDark ? 'primary.50' : 'muted.900'} px="4">
          {content}
        </Text>
      </VStack>
    </Center>
  );
}
