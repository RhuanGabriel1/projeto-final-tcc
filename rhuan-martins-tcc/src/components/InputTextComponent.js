import React from 'react';
import { TextInput } from 'react-native';

const InputTextComponent = (props) => {

    return (
        <TextInput
            style={props.style}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            defaultValue={props.value}
            onChangeText={props.onChange}
        />
    );
}

export { InputTextComponent };