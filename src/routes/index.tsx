import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { useEffect, useState } from "react";
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from "react-native-onesignal";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { Notification } from "../components/Notification";

const linking = {
  prefixes: ["ignite-gym://", "com.mahayat.ignitegym://", "exp+ignite-gym://"],
  config: {
    screens: {
      exercise: {
        path: "exercise/:exerciseId",
        parse: {
          exerciseId: (exerciseId: string) => exerciseId,
        },
      },
    },
  },
};

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationRecivedEvent: NotificationReceivedEvent) => {
        const response = notificationRecivedEvent.getNotification();

        setNotification(response);
      }
    );

    return () => unsubscribe;
  }, []);

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  );
}
