import { Card, Heading, Flex, TextField, Button } from '@radix-ui/themes';

const CategoryForm = () => {
    return (
        <Card>
            <Heading as="h2" size="3">
                Add Category
            </Heading>
            <Flex direction="column" gap="3" maxWidth="300px">
                <TextField.Root placeholder="Category" radius="large" />
                <Button variant="solid" radius="large" color="grass">
                    Save
                </Button>
            </Flex>
        </Card>
    );
};

export default CategoryForm;
