import { EntryContainer, EntryLabel, EntryValue } from './styles';
import { formatToCurrency } from '@/utilities/helpers';

interface EntryProps {
  label: string;
  value: number;
}

const Entry = ({ label, value }: EntryProps) => {
  return (
    <EntryContainer>
      <EntryLabel>{label}</EntryLabel>
      <EntryValue>{formatToCurrency(value)}</EntryValue>
    </EntryContainer>
  );
};

export default Entry;
