// import { router } from "expo-router";
// import React, { useState } from "react";
// import { TouchableOpacity, View, Image } from "react-native";

// import { AppButton } from "@/components/ui/AppButton";
// import { AppInput } from "@/components/ui/AppInput";
// import { AppScreen } from "@/components/ui/AppScreen";
// import { AppText } from "@/components/ui/AppText";
// import { useSession } from "@/features/ctx";

// export default function SignIn() {
//   const { signIn } = useSession();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     await signIn();
//     router.replace("/");
//   };

//   return (
//     <AppScreen scrollable withKeyboard={true}>
//       <View className="flex-1 mt-16 w-full">
//         {/* Logo */}
//         <View className="items-center mb-8">
//           <Image
//             source={require("@/assets/images/icon.png")} // Update path to your logo
//             className="w-24 h-24"
//             resizeMode="contain"
//           />
//         </View>

//         {/* Header */}
//         <View className="mb-10">
//           <AppText className="text-3xl font-bold mb-2 text-center">
//             Welcome Back
//           </AppText>
//           <AppText className="text-base opacity-70 text-center">
//             Sign in to continue to Credora
//           </AppText>
//         </View>

//         {/* Form */}
//         <View className="gap-4">
//           <AppInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//             keyboardType="email-address"
//           />

//           <AppInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>

//         {/* Button */}
//         <View className="mt-8">
//           <AppButton title="Sign In" onPress={handleLogin} />
//         </View>

//         {/* Footer */}
//         <TouchableOpacity
//           onPress={() => router.push("/sign-up")}
//           className="mt-6 items-center">
//           <AppText className="opacity-70">Don&apos;t have an account?</AppText>
//           <AppText className="mt-1 font-semibold">Create Account</AppText>
//         </TouchableOpacity>
//       </View>
//     </AppScreen>
//   );
// }

import { router } from "expo-router";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppText } from "@/components/ui/AppText";
import { useSession } from "@/features/ctx";
import { AppScreen } from "@/components/ui/AppScreen";

export default function SignIn() {
  const { signIn } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
        }}
      >
        <View className="flex-1 justify-center w-full">
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
            <AppInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <AppInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Button */}
          <View className="mt-8">
            <AppButton title="Sign In" onPress={handleLogin} />
          </View>

          {/* Footer */}
          <TouchableOpacity
            onPress={() => router.push("/sign-up")}
            className="mt-6 items-center"
          >
            <AppText className="opacity-70">
              Don&apos;t have an account?
            </AppText>
            <AppText className="mt-1 font-semibold">
              Create Account
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AppScreen>
  );
}
