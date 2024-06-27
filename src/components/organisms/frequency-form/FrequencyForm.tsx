import { Card, Heading, Flex, TextField, Button } from '@radix-ui/themes';

const FrequencyForm = () => {
    return (
        <Card>
            <Heading as="h2" size="3">
                Add Frequency
            </Heading>
            <Flex direction="column" gap="3" maxWidth="300px">
                <TextField.Root placeholder="Frequency" radius="large" />
                <Button variant="solid" radius="large" color="grass">
                    Save
                </Button>
            </Flex>
        </Card>
    );
};

export default FrequencyForm;
