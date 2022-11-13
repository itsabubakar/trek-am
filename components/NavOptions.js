import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import ResultScreen from '../screens/ResultScreen'
import { selectOrigin, selectDestination } from '../slices/navSlice'

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    console.log(origin);

    return (
        <View>
            <TouchableOpacity
                disabled={!origin && !destination}
                onPress={() => navigation.navigate(ResultScreen)}
                style={tw`bg-blue-400 py-4 rounded ${!origin && 'bg-gray-200'} ${!destination && 'bg-gray-200'}`}
            >
                <View style={tw``}>
                    <Text style={tw`text-center text-white font-semibold text-lg`}>Calculate Distance</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default NavOptions