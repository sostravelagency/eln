import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import login from "../api/post/login";
import { AppContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase";
WebBrowser.maybeCompleteAuthSession();
if (Platform.OS === "web") {
  WebBrowser.maybeCompleteAuthSession();
}
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/Iv1.9180de2537df9b10",
};

const LoginScreen = () => {
  useEffect(() => {
    firebase?.initializeApp(firebaseConfig);
    if (Platform.OS === "ios") {
      WebBrowser.maybeCompleteAuthSession();
    }
  }, []);
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
      clientId: "Iv1.9180de2537df9b10",
      scopes: ["identity", "user:email", "user:follow"],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      const exchangeCodeForToken = async (code) => {
        const response = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: 'Iv1.9180de2537df9b10',
            client_secret: '9b3fdc43a971776c2300a8cdf03dc5c61d9367f1',
            code: code,
          }),
        });
        const data= await response.json()
        const userInfo= await getUserInfo(data.access_token)
        console.log("user info", userInfo)
        return response
        
      };
      const result=  exchangeCodeForToken(code)
    }
  }, [response]);

  const getUserInfo = async (accessToken) => {
    console.log(accessToken)
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
    });
  
    const userData = await response.json();
    return userData;
  };

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
      <Button
        title="Login with google"
        onPress={() => promptAsync()}
      />
      <Button
        disabled={!request}
        title="Login with github"
        onPress={()=> promptAsync()}
      />
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
