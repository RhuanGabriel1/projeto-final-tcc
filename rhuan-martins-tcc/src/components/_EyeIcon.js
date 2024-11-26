import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EyeIcon = () => {
    return (
        <TouchableOpacity
            style={styles.iconEyeA}
            onPress={togglePasswordVisibility}>
            <MaterialIcons
                name={passwordVisible ? 'visibility-off' : 'visibility'}
                size={24}
                color="grey"
            />
        </TouchableOpacity>
    );
}

export { EyeIcon };