import FormLabel from '@/components/atoms/form-label/FormLabel';
import { FormError } from '@/components/atoms/form-label/styles';
import { Flex, TextField } from '@radix-ui/themes';

interface TextInputProps {
  name: string;
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
  hasError: boolean;
  error: string;
}

const TextInput = ({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  hasError,
  error,
}: TextInputProps) => {
  return (
    <Flex direction="column" gap="1">
      <FormLabel labelFor={name}>{label}</FormLabel>
      <TextField.Root
        radius="large"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError ? <FormError>{error}</FormError> : null}
    </Flex>
  );
};

export default TextInput;
