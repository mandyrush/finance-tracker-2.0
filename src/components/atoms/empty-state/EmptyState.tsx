import { Heading, Text } from '@radix-ui/themes';
import { EmptyStateContainer } from './styles';

interface EmptyStateProps {
    message: string;
    description?: string;
}

const EmptyState = ({ message, description }: EmptyStateProps) => {
    return (
        <EmptyStateContainer>
            <Heading as="h3" size="3" align="center">
                {message}
            </Heading>
            <Text as="p" size="2" align="center">
                {description}
            </Text>
        </EmptyStateContainer>
    );
};

export default EmptyState;
