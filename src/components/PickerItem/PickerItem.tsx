import React, {useState} from 'react';
import {Pressable, Text} from 'react-native';
import {themeColors} from '../../themes/colors';

type PickerItemProps = {
  text: string;
  value: boolean;
  onChange: (checked: boolean) => void;
};

export const PickerItem: React.FC<PickerItemProps> = ({
  text,
  value,
  onChange
}) => {
  const [checked, setChecked] = useState<boolean>(value);
  return (
    <Pressable
      style={{
        borderRadius: 24,
        borderWidth: 1,
        padding: 4,
        borderColor: themeColors.primaryColor,
        ...(checked ? {backgroundColor: themeColors.primaryColor} : {})
      }}
      onPress={() =>
        setChecked(oldVal => {
          onChange(!oldVal);
          return !oldVal;
        })
      }>
      <Text
        style={{
          fontSize: 14,
          color: checked
            ? themeColors.primaryTextColor
            : themeColors.primaryColor
        }}>
        {text}
      </Text>
    </Pressable>
  );
};
