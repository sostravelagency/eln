import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import login from "../api/post/login";
import { AppContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/ccf750727d23af944b7e",
};

const LoginScreen = () => {
  const route = useRoute();
  const { from, courseId } = route.params;
  const navigation = useNavigation();
  const { setAuth, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "ccf750727d23af944b7e",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "com.ptr.ler",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    try {
      const result = await login({ email, password });
      const data = result;
      setUser(data?.user);
      setAuth(true);
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      if (from) {
        if (from === "DetailCourse") {
          const isPurchased = data.user.courses.find(
            (item) => item._id === courseId
          );
          if (isPurchased) {
            navigation.navigate("CourseAccess", { courseId });
          } else {
            navigation.navigate(from, { courseId });
          }
        } else {
          navigation.navigate(from, { courseId });
        }
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      const { data } = error.response;
      setAuth(false);
      setUser();
      Alert.alert("Account or password is not correct");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Elearning</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with google" onPress={handleLogin} />
      <Button disabled={!request} title="Login with github" onPress={promptAsync} />
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register now!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  registerText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
