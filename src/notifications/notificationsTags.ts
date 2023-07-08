import OneSignal from "react-native-onesignal";

export function tagUserIsLoggedIn(isLoggedIn: boolean) {
  OneSignal.sendTag("user_is_logged_in", String(isLoggedIn));
}

export function tagUsersLastExerciseDay(day: string) {
  OneSignal.sendTag("users_last_exercise_day", day);
}

export function tagUserData(name: string) {
  OneSignal.sendTag("user_name", name);
}
