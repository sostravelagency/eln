import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const About = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{width: "100%"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", margin: 12}}>
            <Text style={{fontWeight: "600", fontSize: 24}}>What is</Text>
            <Text style={{fontWeight: "600", fontSize: 24, color: "#5c3bd6", marginLeft: 6}}>Greenwich Academy?</Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
              Are you ready to enhance your programming skills? Look no further! Greenwich Academy stands as the premier programming community dedicated to helping aspiring coders achieve their goals and unleash their full potential.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            As the founder and CEO of Greenwich Academy, I bring firsthand knowledge of the challenges inherent in learning and progressing in the programming field. This motivation drove the creation of Greenwich Academy, with the aim of providing aspiring programmers with essential resources and support for their success.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            Our YouTube channel serves as a valuable archive of educational videos spanning a diverse array of topics, ranging from fundamental programming concepts to advanced techniques. However, this is only the beginning. Our affordably priced courses are meticulously designed to offer you high-quality education crucial for success in the industry, all while remaining budget-friendly.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            At Greenwich Academy, we firmly hold the belief that financial constraints should never impede the pursuit of one's dreams. That's why we've established our course prices at an affordable level, ensuring that everyone, regardless of their financial circumstances, can access the tools and knowledge essential for success.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            At Greenwich Academy, we transcend the conventional notion of a community – we are a family. Our supportive community comprises individuals with shared goals, prepared to guide you at every juncture of your journey, regardless of whether you are a novice or seeking to advance your skills.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            Having Greenwich Academy by your side means there are no barriers standing in the way of realizing your dream job. Our courses and community are ready to provide you with the guidance, support, and inspiration needed to unlock your full potential and transform into a skilled programmer.
            </Text>
          </View>
          <View style={{width: "100%", margin: 12}}>
            <Text style={{fontSize: 18, fontWeight: "500"}}>
            Don't delay any further! Join the Greenwich Academy community today and let's conquer the programming industry together! With our budget-friendly courses, educational videos, and supportive community, the possibilities are boundless.
            </Text>
          </View>
        </View>
    </ScrollView>
  )
}

export default About
