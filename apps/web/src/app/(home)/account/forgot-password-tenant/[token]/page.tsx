import DesainResetPass from "../../_components/DesainResetPass";
import FormikResetPassTenant from "../_components/FormikResetPass";

const ResetPass = ({ params }: { params: { token: string } }) => {
  return (
    <DesainResetPass>
      <FormikResetPassTenant token={params.token}/>
    </DesainResetPass>
  );
};

export default ResetPass;
