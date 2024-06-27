import { Label } from './styles';

interface FormLabelProps {
    labelFor: string;
    children: string;
}

const FormLabel = ({ labelFor, children }: FormLabelProps) => {
    return <Label htmlFor={labelFor}>{children}</Label>;
};

export default FormLabel;
