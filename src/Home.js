
import React, { Component } from 'react'
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { PERMISSIONS, request } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
// import { Marker, Callout, PROVIDER_GOOGLE, CalloutSubview } from "react-native-maps";
import MapView from 'react-native-maps'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Mapbox, { MarkerView, Callout } from '@rnmapbox/maps';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { wp } from './helper';
import * as Location from 'react-native-location';



Mapbox.setWellKnownTileServer(Platform.OS === "ios" ? 'mapbox' : "Mapbox");
Mapbox.setAccessToken('sk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2xoYnloaTNkMDJlNzNmbzJlN3o2Y2pkdSJ9.u1QlCvD_wSJkeb-pmM1Wxg');
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });
Geocoder.init("AIzaSyDpVrgba7CrGoP5144CtbxhQ6Q5_e8Y_Kg");
const locations = [
    {
        lat: 31.407085,
        lng: 73.147595
    },
    {
        lat: 31.407085,
        lng: 73.148590
    },
    {
        lat: 31.4504,
        lng: 73.135
    }
]
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: 40.0583,
                longitude: 74.4057,
                latitudeDelta: 0.8,
                longitudeDelta: 0.8,
            },
            formatedAddress: "",
            coordinates: [
                [-73.99155, 40.73581],
                [-73.99155, 40.73683],
                [73.135, 31.4506],
            ],
        }
    }
    async componentDidMount() {
        let granted = await Location.requestPermission({ ios: "whenInUse", android: { detail: "fine" } });

        if (!granted) {
            return this.setState({ showAlert: true, alertMessage: 'Permission to access location was denied!' })

            //alert('Permission to access location was denied');
        }
        Geocoder.init("AIzaSyDpVrgba7CrGoP5144CtbxhQ6Q5_e8Y_Kg");
        this.getOneTimeLocation()
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((RESULTS) => {
            switch (RESULTS) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        "This feature is not available (on this device / in this context)"
                    );
                    break;
                case RESULTS.DENIED:
                    console.log(
                        "The permission has not been requested / is denied but requestable"
                    );
                    break;
                case RESULTS.LIMITED:
                    console.log("The permission is limited: some actions are possible");
                    break;
                case RESULTS.GRANTED:
                    console.log("The permission is granted");
                    // Permission has been granted - app can request location coordinates
                    this.getOneTimeLocation();
                    break;
                case RESULTS.BLOCKED:
                    console.log("The permission is denied and not requestable anymore");
                    break;
            }
        });
    }
    getOneTimeLocation = () => {

        Geolocation.getCurrentPosition(
            (position) => {

                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                };
                console.log(position, "posiposiposiposiposi")
                let res = locations.find(f => f.lat === position.coords.latitude && f.lng === position.coords.longitude)
                if (res) {
                    alert("Near location")
                }
                this.setState({
                    region: region,
                    loading: false,
                    error: null,
                });
                // this.map.animateToRegion(region, 2000)
            },
            (error) => {
                this.setState({
                    error: error.message,
                    loading: false,
                });
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 }
        );
    };

    onRegionChange = (region) => {


        this.setState({ region, }, () => {

            this.fetchAddress()
        });


    };
    fetchAddress = () => {
        fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            this.state.region.latitude +
            "," +
            this.state.region.longitude +
            "&key=" +
            "AIzaSyDpVrgba7CrGoP5144CtbxhQ6Q5_e8Y_Kg"
        )
            .then((response) => response.json())
            .then((responseJson) => {
                const userLocation = responseJson?.results[0]?.geometry.location;
                console.log(responseJson?.results[0]?.formatted_address, "userLocation")
                let res = locations.find(f => f.lat === responseJson?.results[0]?.geometry.location.lat && f.lng === responseJson?.results[0]?.geometry.location.lng)
                if (res) {
                    alert("near location")
                }
                this.setState({
                    formatedAddress: responseJson?.results[0]?.formatted_address,
                    completeLoc: responseJson,
                });
            });
    };
    onUserLocationUpdate(location) {

        let res = locations.find(f => f.lat === location.coords.latitude && f.lng === location.coords.longitude)
        if (res) {
            alert("near location")
        }
    }
    render() {
        return (
            <Mapbox.MapView
                // logoEnabled={false}

                cor con reg style={{ flex: 1 }} >
                {/* <Mapbox.Camera zoomLevel={5} coordinate={[20.5937, 78.9629,]} /> */}

                <Mapbox.UserLocation requestsAlwaysUse={true}
                    // onUpdate={e => console.log(e, "dfgfwrefwefdsfdsfsdf")}
                    onUpdate={(e) => this.onUserLocationUpdate(e)}
                    animated={true} visible={true} showsUserHeadingIndicator={true} />
                {/* <Mapbox.Camera
                    zoomLevel={16}
                    centerCoordinate={this.state.coordinates[1]}
                /> */}
                <Mapbox.Camera
                    animationDuration={2000}
                    zoomLevel={16}
                    followUserMode={'normal'}
                    // followUserLocation={true}
                    centerCoordinate={[this.state.region?.longitude, this.state?.region?.latitude]}
                />
                {
                    this.state.coordinates.map((item, index) =>
                        <Mapbox.PointAnnotation
                            key={index}
                            // onSelected={() => alert("df")}
                            coordinate={item}
                            id="pt-ann"
                        >
                            <MaterialCommunityIcons name="map-marker-radius" size={30} />
                            <Callout title="This is a sample loading a remote image" />
                        </Mapbox.PointAnnotation>
                    )
                }

                {/* <View style={{ position: "absolute", width: "90%", zIndex: 2, marginTop: getStatusBarHeight() + 10, alignSelf: "center" }} >
                    <GooglePlacesAutocomplete

                        styles={{
                            description: { color: "#000" },
                            container: {}, powered: { display: "none", },
                            textInputContainer: {
                                width: "100%", backgroundColor: "#F7F8F9", borderWidth: 1, borderColor: "#E8ECF4",
                                borderRadius: 8, height: 50, color: '#000', paddingHorizontal: 10,
                            },
                            textInput: {
                                height: 50, fontSize: 16,
                                backgroundColor: "rgba(0,0,0,0)", color: "#004264", paddingLeft: 25
                            },
                            predefinedPlacesDescription: { color: "#1faadb" },
                            listView: {
                                color: "#004264", backgroundColor: "white",
                                paddingHorizontal: 10, marginTop: 10, width: wp(85)
                            },

                            poweredContainer: { display: "none", },
                        }}

                        listUnderlayColor="green"
                        placeholder={"Search Location"}
                        ref={ref => this.textInput = ref}
                        textInputProps={{ placeholderTextColor: "#aaa", onChangeText: e => e.length === 0 && this.setState({ address: null, showStartJourney: false, startJourney: false, }), onFocus: () => this.setState({ showStartJourney: false }), onBlur: () => this.state.address && this.setState({ showStartJourney: true }) }}
                        onPress={(data, details = null) => {
                            console.log(data, details, "Ewfgrefefasredewrer")

                            Geocoder.from(data.description)
                                .then((json) => {
                                    const { location } = json.results[0].geometry;
                                    const region = {
                                        latitude: location.lat,
                                        longitude: location.lng,
                                        latitudeDelta: 0.022,
                                        longitudeDelta: 0.022,
                                    };
                                    console.log(region, "dgefgdsfsdfdsf")
                                    this.setState({ destination: region, })




                                })
                                .catch((error) => { console.warn(error); this.setState({ loading: false }) });

                        }}

                        query={{
                            key: "AIzaSyA_jzgsNBD9FklOoEVmmdAH9nufXVgqQIE",
                            language: "en",
                        }}
                    />
                </View> */}

            </Mapbox.MapView>
        )
    }
}

export default Home