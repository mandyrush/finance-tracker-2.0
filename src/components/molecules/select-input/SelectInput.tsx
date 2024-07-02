import FormLabel from '@/components/atoms/form-label/FormLabel';
import { FormError } from '@/components/atoms/form-label/styles';
import { Flex, Select, Text } from '@radix-ui/themes';
import strings from '@/locals/en';

const {
  global: { loading },
} = strings;

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  isLoading?: boolean;
  options: { label: string; value: string }[];
  hasError: boolean;
  error: string;
}

const SelectInput = ({
  name,
  label,
  value,
  onValueChange,
  placeholder,
  isLoading,
  options,
  hasError,
  error,
}: SelectInputProps) => {
  return (
    <Flex direction="column" gap="1">
      <FormLabel labelFor={name}>{label}</FormLabel>
      <Select.Root
        size="2"
        name={name}
        value={value}
        onValueChange={onValueChange}
      >
        <Select.Trigger radius="large" placeholder={placeholder} />
        <Select.Content>
          {isLoading ? (
            <Select.Item value="loading">
              <Text>{loading}...</Text>
            </Select.Item>
          ) : (
            options?.map(({ label, value }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))
          )}
        </Select.Content>
      </Select.Root>
      {hasError ? <FormError>{error}</FormError> : null}
    </Flex>
  );
};

export default SelectInput;
