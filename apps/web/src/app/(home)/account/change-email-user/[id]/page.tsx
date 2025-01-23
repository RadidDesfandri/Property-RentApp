import React from "react";
import FormikChangeMailUser from "../_components/FormikChangeMailUser";
import DesainChangeEmail from "../../_components/DesainChangeEmail";

const ChangeEmailUser = ({ params }: { params: { id: string } }) => {
  return (
    <DesainChangeEmail>
      <FormikChangeMailUser id={params.id} />
    </DesainChangeEmail>
  );
};

export default ChangeEmailUser;
