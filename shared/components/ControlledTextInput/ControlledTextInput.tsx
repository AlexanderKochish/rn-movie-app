import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Text, View } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: object
} & Omit<TextInputProps, 'onChangeText' | 'value'>

export const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  rules,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  })

  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        mode="outlined"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={!!error}
        {...rest}
      />
      {error && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
          {error.message || 'Error'}
        </Text>
      )}
    </View>
  )
}
