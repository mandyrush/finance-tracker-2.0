import { Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorCalloutProps {
    message: string;
    icon?: React.ReactNode;
}

const ErrorCallout = ({ message, icon }: ErrorCalloutProps) => {
    return (
        <Callout.Root color="red" role="alert">
            <Callout.Icon>
                {icon ? icon : <ExclamationTriangleIcon />}
            </Callout.Icon>
            <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
    );
};

export default ErrorCallout;
