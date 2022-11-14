import { View, Text } from 'react-native'
import { selectDestination, selectOrigin, setTravelTimeInformation, selectTravelTimeInformation } from '../slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'



const ResultScreen = () => {

    const navigation = useNavigation()

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const dispatch = useDispatch()


    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    const travelDistance = travelTimeInformation?.distance.text
    const travelValue = travelTimeInformation?.distance.value
    const travelDuration = travelTimeInformation?.duration.text

    const steps = Math.round(travelValue * 1.4);
    const calories = Math.round(steps * 0.04);
    console.log(travelTimeInformation);

    useEffect(() => {
        if (!origin || !destination) return

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?&mode=walking&destinations=${destination.description}&origins=${origin.description}&units=metric&key=AIzaSyBiH_uMgVwEkiVbs - kvSPEDd_NRzDzMdCE`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
        }
        getTravelTime()

    }, [origin, destination]);

    return (
        <ScrollView style={tw`bg-white flex-1`}>
            <View style={tw`my-10`}>

                <View style={tw`flex-row items-center w-full pr-5`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                        style={tw`rounded-full z-50`}>
                        <Icon
                            name='chevron-left'
                            type='fontawesome'
                            size={65}
                        />
                    </TouchableOpacity>
                    <Text style={tw`text-3xl ml-14`}>Treking Info:</Text>
                </View>

                <View style={tw`justify-center mt-12`}>
                    <TouchableOpacity
                        style={tw`rounded-full z-50`}>
                        <Icon
                            name='sunrise'
                            type='feather'
                            size={65}
                            color="blue"
                        />
                    </TouchableOpacity>
                    <Text style={tw`text-center text-4xl mt-8 text-blue-600`}>{steps} Steps</Text>
                </View>

                {/* Icons */}
                <View style={tw`mt-12 flex-row justify-between px-5`}>
                    <View style={tw`flex-1`}>
                        <TouchableOpacity
                            style={tw`rounded-full z-50`}>
                            <Icon
                                name='target'
                                type='feather'
                                color="black"
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text style={tw`text-center text-2xl mt-2 uppercase`}>{travelDistance}</Text>
                    </View>
                    <View style={tw`flex-1`}>
                        <TouchableOpacity
                            style={tw`rounded-full z-50`}>
                            <Icon
                                name='droplet'
                                type='feather'
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text style={tw`text-center text-2xl mt-2`}>{calories} Cal</Text>
                    </View>
                    <View style={tw`flex-1`}>
                        <TouchableOpacity
                            style={tw`rounded-full z-50`}>
                            <Icon
                                name='clock'
                                type='feather'
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text style={tw`text-center text-2xl mt-2`}>{travelDuration}</Text>
                    </View>
                </View>

                <View>
                </View>

            </View>
        </ScrollView>
    )
}
export default ResultScreen