import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppText } from "@/components/ui/AppText";
import { AppScreen } from "@/components/ui/AppScreen";
import { useSession } from "@/features/ctx";
import { authClient } from "@/http-client/auth/client";

export default function SignIn() {
  const { signIn } = useSession();

  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: login, isPending } = useMutation({
    mutationFn: () =>
      authClient.login({
        accountNumber,
        password,
      }),
    onSuccess: (res) => {
      signIn(res.data!.accessToken, res.data!.user);
      router.replace("/");
    },
    onError: (e) => {
      console.error("Login error:", e);
      setErrorMessage("Invalid account number or password");
    },
  });

  const handleLogin = () => {
    setErrorMessage(null);
    login();
  };

  const isDisabled = !accountNumber || !password || isPending;

  return (
    <AppScreen>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}>
        <View className="w-full">
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="mb-10">
            <AppText className="text-3xl font-bold mb-2 text-center">
              Welcome Back
            </AppText>
            <AppText className="text-base opacity-70 text-center">
              Sign in to continue to Credora
            </AppText>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Account Number */}
            <AppInput
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="number-pad"
              autoComplete="username"
              textContentType="username"
              importantForAutofill="yes"
            />

            {/* Password with Show/Hide */}
            <View className="relative">
              <AppInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                textContentType="password"
                importantForAutofill="yes"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 4,
                  height: 40,
                  justifyContent: "center",
                }}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {errorMessage && (
              <AppText className="text-red-500 text-sm">{errorMessage}</AppText>
            )}
          </View>

          {/* Button */}
          <View className="mt-8">
            <AppButton
              title={isPending ? "Signing In..." : "Sign In"}
              onPress={handleLogin}
              disabled={isDisabled}
              loading={isPending}
            />
          </View>

          {/* Footer */}
          <TouchableOpacity
            onPress={() => router.push("/sign-up")}
            className="mt-6 items-center">
            <AppText className="opacity-70">
              Don&apos;t have an account?
            </AppText>
            <AppText className="mt-1 font-semibold">Create Account</AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AppScreen>
  );
}
