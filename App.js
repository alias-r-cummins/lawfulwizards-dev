import React, { Component } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { PERMISSIONS, request } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { Marker, Callout, PROVIDER_GOOGLE, CalloutSubview } from "react-native-maps";
import MapView from 'react-native-maps'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Mapbox, { MarkerView } from '@rnmapbox/maps';
import Home from './src/Home';



Mapbox.setAccessToken('sk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2xoYnloaTNkMDJlNzNmbzJlN3o2Y2pkdSJ9.u1QlCvD_wSJkeb-pmM1Wxg');
const locations = [
  {
    lat: 31.407085,
    lng: 73.147595
  }, {
    lat: 31.407085,
    lng: 73.148590
  }
]
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: 40.0583,
        longitude: 74.4057,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      },
      formatedAddress: ""
    }
  }
  componentDidMount() {
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
        // console.log(position, "posi")
        let res = locations.find(f => f.lat === position.coords.latitude && f.lng === position.coords.longitude)
        if (res) {
          alert("near location")
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
  render() {
    return (
      <Home />
      // <View style={{ flex: 1 }} >
      //   <MapView
      //     showsUserLocation={true}
      //     style={styles.map}
      //     ref={ref => this.map = ref}
      //     zoomEnabled={true}
      //     initialRegion={this.state.region}
      //     customMapStyle={mapStyle}
      //     // onMapReady={this.onMapReady}
      //     showsMyLocationButton={false}
      //     provider={PROVIDER_GOOGLE}
      //     userInterfaceStyle={"light"}
      //     onRegionChangeComplete={this.onRegionChange}
      //   >
      //     {
      //       locations.map((item, index) =>
      //         <Marker key={index} coordinate={{ latitude: item.lat, longitude: item.lng }} >

      //         </Marker>
      //       )
      //     }


      //   </MapView>
      //   <View style={{
      //     position: "absolute",
      //     bottom: 23,
      //     right: 0
      //   }}>
      //     <TouchableOpacity onPress={() => { this.getOneTimeLocation() }}>
      //       <Image style={{ width: 60, height: 60, padding: 10, marginRight: 20, marginTop: 10, tintColor: "white" }} source={require("./assets/currentloc.png")} />
      //     </TouchableOpacity>
      //   </View>

      //   <View style={{ width: "90%", alignSelf: "center", height: 50, backgroundColor: "white", borderRadius: 6, position: "absolute", top: getStatusBarHeight(), zIndex: 10 }} >
      //     <TextInput value={this.state.formatedAddress} style={{ width: "100%", height: "100%", paddingHorizontal: 10, }} />
      //   </View>
      // </View>

    )
  }
}

export default App

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
})

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];