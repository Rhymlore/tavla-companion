import Link from 'next/link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ButtonsProps = {
  link: string;
  name: string;
};

const Buttons: React.FC<ButtonsProps> = ({ link, name }) => {
  return (
    <Link href={`/${link}`}>
      <Button variant="contained" size="large">
        <Typography variant="button" display="block" gutterBottom>
          {name}
        </Typography>
      </Button>
    </Link>
  );
}

export default Buttons;
