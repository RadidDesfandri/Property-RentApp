import DesainResetPass from "../../_components/DesainResetPass";
import FormikResetPassUser from "../_components/FormikResetPass";

const ResetPass = ({ params }: { params: { token: string } }) => {
  return (
    <DesainResetPass>
      <FormikResetPassUser token={params.token}/>
    </DesainResetPass>
  );
};

export default ResetPass;
