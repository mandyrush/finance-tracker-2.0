import styled from 'styled-components';
import { Container } from '@radix-ui/themes';

export const MainContainer = styled(Container)`
    background-color: ${({ theme }: { theme: any }) => theme.colors.gray2};
`;
