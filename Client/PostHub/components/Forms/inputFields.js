import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const InputFields = ({
  text,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  autoComplete,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text} :</Text>

      <TextInput
        placeholder={placeholder}
        style={styles.inputBox}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '3%',
    justifyContent: 'space-between',
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: '2%',
    fontSize: 12,
    width: '65%',
    justifyContent: 'center',
    color: '#786C5B',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5e503f',
  },
});
export default InputFields;
