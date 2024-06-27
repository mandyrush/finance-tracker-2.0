import { EntryContainer, EntryLabel, EntryValue } from "./styles";

interface EntryProps {
  label: string;
  value: number;
}

const Entry = ({ label, value }: EntryProps) => {
  return (
    <EntryContainer>
      <EntryLabel>{label}</EntryLabel>
      <EntryValue>${value}</EntryValue>
    </EntryContainer>
  );
};

export default Entry;
