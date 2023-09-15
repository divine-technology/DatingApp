import React, {useState} from 'react';
import {View} from 'react-native';
import {PickerItem} from '../PickerItem/PickerItem';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

type PickerProps = {
  data: string[];
  value: string[];
  onChange: (data: string[]) => void;
};

export const Picker: React.FC<PickerProps> = ({data, value, onChange}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(value ?? []);

  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 4
      }}>
      {data.map(item => (
        <PickerItem
          text={item}
          value={selectedItems.includes(item)}
          onChange={checked => {
            if (checked) {
              setSelectedItems(oldVal => {
                oldVal.push(item);
                onChange(oldVal);
                return oldVal;
              });
            } else {
              const index = selectedItems.indexOf(item);
              setSelectedItems(oldVal => {
                oldVal.splice(index, 1);
                onChange(oldVal);
                return oldVal;
              });
            }
          }}
        />
      ))}
    </View>
  );
};

type ControlledPickerProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<PickerProps, 'value' | 'onChange'>;

export const ControlledPicker = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledPickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState: {error}}) => <Picker {...rest} {...field} />}
    />
  );
};
