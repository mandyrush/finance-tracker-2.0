import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Entry as EntryModel } from 'models/entry';
import { capitalizeFirstLetter } from '@/utilities/helpers';
import strings from '@/locals/en';
import Entry from '@/components/atoms/entry/Entry';
import { Heading, Flex } from '@radix-ui/themes';
import {
  WidgetContainer,
  WidgetHeader,
  WidgetBody,
  WidgetFooter,
} from './styles';

const {
  global: { total: totalLabel, view },
} = strings;

export interface WidgetEntry {
  id: number;
  label: string;
  value: number;
}

interface CategoriesWidgetProps {
  title: string;
  entries: EntryModel[];
}

const CategoriesWidget = ({ title, entries }: CategoriesWidgetProps) => {
  const categoryEntries = useMemo(() => {
    return entries.reduce((accumulator, current) => {
      const categoryIndex = accumulator.findIndex(
        (category) => category.label === current.category.name
      );
      if (categoryIndex === -1) {
        accumulator.push({
          id: current.id,
          label: current.category.name,
          value: Number(current.amount),
        });
      } else {
        accumulator[categoryIndex].value += Number(current.amount);
      }
      return accumulator;
    }, [] as WidgetEntry[]);
  }, [entries]);

  const categoriesTotal = useMemo(() => {
    return categoryEntries.reduce((accumulator, current) => {
      accumulator += current.value;
      return accumulator;
    }, 0);
  }, [categoryEntries]);

  return (
    <WidgetContainer>
      <WidgetHeader>
        <Heading as="h2">{title}</Heading>
      </WidgetHeader>
      <WidgetBody>
        {categoryEntries.map((entry) => (
          <Entry
            key={entry.id}
            label={capitalizeFirstLetter(entry.label)}
            value={entry.value}
          />
        ))}
        <Entry label={totalLabel} value={categoriesTotal} />
      </WidgetBody>
      <WidgetFooter>
        <Flex justify="end">
          <NavLink to="budget">{view}</NavLink>
        </Flex>
      </WidgetFooter>
    </WidgetContainer>
  );
};

export default CategoriesWidget;
