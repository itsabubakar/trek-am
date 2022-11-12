import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from "@rneui/themed"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { LogBox } from 'react-native'
import { useEffect } from 'react'
import { setDestination, setOrigin, selectDestination, selectOrigin } from '../slices/navSlice'


const HomeScreen = () => {
    const dispatch = useDispatch()
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])  //ignores a warning because I have a flatlist inside a scrolllist


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
            <View style={tw`px-5 bg-white flex-1`}>
                <View>
                    {/* Logo */}
                    <View>
                        <Icon
                            name="activity"
                            color={"white"}
                            type="feather"
                            size={60}
                            style={tw`p-2 bg-gray-700 rounded-full w-20 text-2xl mt-20 mb-2`}
                        />
                    </View>

                    {/* Header Text */}
                    <View>
                        <Text style={tw`text-3xl font-bold pt-10 text-gray-700`}>Trek Am?</Text>
                        <Text style={tw`text-xl pt-2 text-gray-700`}>Measure the distance</Text>
                    </View>
                </View>


                {/* Where from */}
                <View style={tw`mt-6`}>
                    <Text style={tw`text-xl text-gray-700 font-bold`}>Starting from?</Text>
                    <View style={tw`mt-4 px-2`}>
                        <GooglePlacesAutocomplete
                            placeholder='Where From'
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                            styles={{
                                container: {
                                    flex: 0,
                                },
                                textInput: {
                                    fontSize: 18,
                                    borderColor: "#808080",
                                    borderBottomWidth: 2,
                                    borderRadius: 0,
                                }
                            }}

                            query={{
                                key: 'AIzaSyBiH_uMgVwEkiVbs - kvSPEDd_NRzDzMdCE',
                                language: 'en'
                            }}
                            minLength={2}
                            enablePoweredByContainer={false}
                            onPress={(data, details = null) => {
                                dispatch(setOrigin({
                                    location: details.geometry.location,
                                    description: data.description
                                }))

                                console.log(origin)
                            }}
                            fetchDetails={true}
                            returnKeyType={'search'}
                        />
                    </View>
                </View>

                {/* Where to */}
                <View style={tw`mt-6 mb-10`}>
                    <Text style={tw`text-xl text-gray-700 font-bold`}>Destination</Text>
                    <View style={tw`mt-4 px-2`}>
                        <GooglePlacesAutocomplete
                            placeholder='Where To'
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                            styles={{
                                container: {
                                    flex: 0,
                                },
                                textInput: {
                                    fontSize: 18,
                                    borderColor: "#808080",
                                    borderBottomWidth: 2,
                                    borderRadius: 0,
                                }
                            }}

                            query={{
                                key: 'AIzaSyBiH_uMgVwEkiVbs - kvSPEDd_NRzDzMdCE',
                                language: 'en'
                            }}
                            minLength={2}
                            enablePoweredByContainer={false}
                            onPress={(data, details = null) => {
                                dispatch(
                                    setDestination({
                                        location: details.geometry.location,
                                        description: data.description,
                                    }))
                                console.log(destination)
                            }}
                            fetchDetails={true}
                            returnKeyType={'search'}
                        />
                    </View>
                </View>


                {/* Calculate Distance button */}


            </View>
        </KeyboardAvoidingView>

    )
}


export default HomeScreen