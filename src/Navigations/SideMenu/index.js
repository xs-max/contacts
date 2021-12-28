import React from 'react'; 
import { Image, StyleSheet, Alert, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../components/common/Icon'
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';
import { SETTINGS } from '../../constants/routNames';
import logoutUser from '../../context/actions/auth/logoutUser';





const SideMenu = ({navigation, authDispatch}) => {

    const handleLogout = () => {
        navigation.toggleDrawer();
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => {}
            },
            {
                text: "Ok",
                onPress: () => {
                    logoutUser()(authDispatch);
                }
            }
        ])
    }
    const menuItems = [
      {
        icon: (
          <Icon
            type="material"
            name="settings"
            size={21}
            style={{color: colors.primary}}></Icon>
        ),
        name: 'Settings',
        onPress: () => navigation.navigate(SETTINGS),
      },
      {
        icon: (
          <Icon
            type="material"
            name="logout"
            size={21}
            style={{color: colors.danger}}></Icon>
        ),
        name: 'Logout',
        onPress: handleLogout,
      },
    ];
        return (
            <View>
                <Container>
                    <Image 
                        height={70}
                        width={70}
                        source={require('../../assets/images/logo.png')} 
                        style={styles.logoImage} 
                    />

                    <View style={{paddingHorizontal: 70}}>
                        {menuItems.map( ({name, icon, onPress}) => (
                            <TouchableOpacity key={name} style={styles.items} onPress={() => onPress()}>
                                {icon}
                                <Text style={styles.itemText}>{name}</Text>
                            </TouchableOpacity>)
                            )}
                    </View>
                </Container>
            </View>
        )
}

const styles = StyleSheet.create({
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 50
    },
    items: {
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: 'center'
    },
    itemText: {
        fontSize: 17,
        paddingVertical: 7,
        paddingLeft: 20,
    }
});

export default SideMenu