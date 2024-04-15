import React from "react";
import { ScrollView, Text, View } from "react-native";

const Policy = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 12 }}>
          Platform Terms and Condition
        </Text>
        <Text style={{ fontSize: 18 }}>
          This e-learning platform provides online courses and educational
          resources. By accessing and using our platform, you agree to comply
          with the following terms and conditions:
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Account Creation:
          </Text>
          You must use your real information to create an account. Accounts
          registered by{" "}
          <Text style={{ fontSize: 18, fontWeight: "600" }}>bots</Text> or other
          automated methods are not permitted. You are responsible for
          maintaining the security of your account and password.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Intellectual Property:
          </Text>
          All course content and materials are the intellectual property of the
          platform and/or course instructors. You may not reproduce, distribute
          or publicly display course materials without express written consent.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>User Conduct:</Text>
          You agree to use the platform only for lawful purposes. Prohibited
          conduct includes harassment, threatening behavior, impersonation, and
          copyright infringement. We reserve the right to terminate accounts
          violating these rules.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Purchases:</Text>
          All sales are final. We do not provide refunds for course purchases,
          except in cases of platform malfunction preventing course
          participation. Any refund requests must be made within 7 days of
          purchase.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Privacy:</Text>
          We respect your privacy and use data only in accordance with our
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Disclaimer:</Text>
          We strive to provide accurate and up-to-date information, but make no
          warranties regarding course content. We are not liable for any errors,
          omissions, loss of data or damage resulting from use of the platform.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Links:</Text>
          We may provide third-party links as supplemental resources. However,
          we do not endorse nor are we responsible for third-party content.
        </Text>
      </View>
      <View style={{ width: "100%", padding: 12, marginBottom: 24 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Termination:</Text>
          We may suspend or terminate access to the platform at any time for
          violation of these terms, prolonged inactivity or other reasons.
          Course purchases are non-refundable in the event of account
          termination.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Policy;
