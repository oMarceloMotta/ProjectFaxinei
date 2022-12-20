import { Pressable, FlatList, Box, Center, Spinner } from 'native-base';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/appStore';
import { useLazyQuery } from '@apollo/client';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { FeedCard } from '../../components/FeedCard/FeedCard';
import { Alert } from 'react-native';
import { FeedCardProps } from '../../types';
import { feedActions } from './feedSlice';
import { queryGetFeedPage } from './queries/queryGetFeedPage';

export function FeedScreen({ navigation }: StackScreenProps<ParamListBase>) {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(state => state.feed.feeds);
  const isDark = useAppSelector(state => state.app.isDarkTheme);

  // const { data, loading } = useQuery(queryGetFeedPage);
  const [getFeedPage, { loading }] = useLazyQuery(queryGetFeedPage, {
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { data } = await getFeedPage();
      const feeds = feedDecoder(data);
      dispatch(feedActions.setFeed({ feeds }));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Center height="full" bg={isDark ? 'coolGray.800' : 'warmGray.50'}>
      {feed.length > 0 && (
        <Box marginTop="4" flex="1">
          <FlatList
            data={feed}
            renderItem={({ item, i }: any) => (
              <Pressable
                onPress={() => {
                  Alert.alert('', JSON.stringify(item, undefined, 2));
                }}>
                <FeedCard
                  title={item.title}
                  content={item.content}
                  imageSrc={item.imageSrc}
                />
              </Pressable>
            )}
            keyExtractor={item => item.content}
          />
          {loading && (
            <Center marginBottom="4">
              <Spinner size="lg" color="primary.600" />
            </Center>
          )}
        </Box>
      )}
    </Center>
  );
}
function feedDecoder(data: any): FeedCardProps[] {
  if (data === undefined) {
    return [];
  }

  const { data: feed } = data.feeds;
  const items = feed.map(
    ({ attributes: { name, content, imageLink, image } }: any) => ({
      title: name,
      content,
      imageSrc: image.data
        ? `https://webservices.jumpingcrab.com${image.data.attributes.url}`
        : imageLink,
    }),
  );
  return items;
}
