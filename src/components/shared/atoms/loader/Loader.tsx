import { Flex, Skeleton } from '@radix-ui/themes';

const Loader = () => {
    return (
        <Flex direction="column" gap="1">
            <Skeleton width="50%" />
            <Skeleton width="75%" />
            <Skeleton width="100%" />
        </Flex>
    );
};

export default Loader;
