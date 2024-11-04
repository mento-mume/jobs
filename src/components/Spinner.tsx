import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

interface SpinnerProps {
  loading: boolean;
}
const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
