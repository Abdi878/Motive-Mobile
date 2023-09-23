import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import blogs from "../../services/blogs";
import { COLORS, SIZES, icons } from "../../constants";
import { Company, JobFooter, JobTabs, ScreenHeaderBtn } from "../../components";
import { styles } from "../../components/home/welcome/welcome.style";
import { useCallback, useState } from "react";
const queryClient = new QueryClient();
const Motive = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  console.log(params.id);
  const { data, status, isLoading,refetch } = useQuery("blogs", blogs.getAll);
  const motive = data && data.find((blog) => blog.id === params.id);
  console.log(data);
  console.log(status);
  const tabs = ["Details", "Rules", "Members"];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerBackVisible: false,
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => {}}
            />
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : status.error ? (
          <Text>Something went wrong</Text>
        ) : data?.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            {data && <Company data={data[0]} />}

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <Motive />
  </QueryClientProvider>
);
