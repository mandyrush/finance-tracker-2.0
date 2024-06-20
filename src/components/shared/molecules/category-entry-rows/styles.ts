import styled from 'styled-components';
import '@radix-ui/themes/tokens/colors/grass.css';
import { Table } from '@radix-ui/themes';

export const RowHeader = styled(Table.RowHeaderCell)`
    background: var(--grass-12);
    color: #ffffff;
`;
