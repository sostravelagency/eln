import React from 'react'
import { Image, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings'

const ItemReview = (props) => {
  return (
    <View style={{display: "flex", alignItems: "center", flexDirection: "row", marginTop: 12}}>
        <Image source={{uri: props?.user?.avatar?.url}} style={{width: 50, height: 50, objectFit: "cover", borderRadius: 25}} />
        <Text style={{fontSize: 16, marginLeft: 8, marginRight: 12}}>{props?.user?.name}</Text>
        <Rating
            ratingCount={props?.ratings}
            style={{ paddingVertical: 10 }}
            imageSize={18}
          />
    </View>
  )
}

export default ItemReview
