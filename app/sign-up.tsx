import { Link, router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppText } from "@/components/ui/AppText";
import { useSession } from "@/features/ctx";
import { AppScreen } from "@/components/ui/AppScreen";

export default function SignUp() {
  const { signIn } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    await signIn();
    router.replace("/");
  };

  return (
    <AppScreen>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}>
        <View className="flex-1 justify-center w-full">
          {/* Logo */}
          <View className="items-center mb-8 mt-8">
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 96, height: 96 }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="mb-10">
            <AppText className="text-3xl font-bold mb-2 text-center">
              Create Account
            </AppText>
            <AppText className="text-base opacity-70 text-center">
              Sign up to get started with Credora
            </AppText>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Name */}
            <View>
              <AppInput
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                autoCapitalize="words"
              />
              {errors.name ? (
                <AppText className="text-red-500 text-sm mt-1 ml-1">
                  {errors.name}
                </AppText>
              ) : null}
            </View>

            {/* Email */}
            <View>
              <AppInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email ? (
                <AppText className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email}
                </AppText>
              ) : null}
            </View>

            {/* Password */}
            <View>
              <AppInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                secureTextEntry
              />
              {errors.password ? (
                <AppText className="text-red-500 text-sm mt-1 ml-1">
                  {errors.password}
                </AppText>
              ) : null}
            </View>

            {/* Confirm Password */}
            <View>
              <AppInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: "" });
                }}
                secureTextEntry
              />
              {errors.confirmPassword ? (
                <AppText className="text-red-500 text-sm mt-1 ml-1">
                  {errors.confirmPassword}
                </AppText>
              ) : null}
            </View>
          </View>

          {/* Terms */}
          <View className="mt-6">
            <AppText className="text-xs opacity-60 text-center">
              By signing up, you agree to our{" "}
              <AppText className="font-semibold">Terms of Service</AppText> and{" "}
              <AppText className="font-semibold">Privacy Policy</AppText>
            </AppText>
          </View>

          {/* Button */}
          <View className="mt-8">
            <AppButton title="Create Account" onPress={handleSignUp} />
          </View>

          {/* Footer */}
          <View className="mt-6 items-center">
            <AppText className="opacity-70">Already have an account?</AppText>

            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <AppText className="mt-1 font-semibold">Sign In</AppText>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppScreen>
  );
}
