import { ClipLoader } from 'react-spinners';

const SpinnerLoader = ({ updating }) => {
  return (
    <ClipLoader
      color={'#123abc'}
      loading={updating}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default SpinnerLoader;
