import React from 'react'
import { View, Text } from 'react-native'

import styles from './company.style'

const Company = ({data}) => {
  return (
    <View>
      <Text>{data.motive}</Text>
    </View>
  )
}

export default Company