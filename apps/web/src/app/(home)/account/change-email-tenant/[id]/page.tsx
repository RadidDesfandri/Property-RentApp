import React from "react";
import DesainChangeEmail from "../../_components/DesainChangeEmail";
import FormikChangeMailTenant from "../_components/FormikChangeEmailTenant";

const ChangeEmailTenant = ({ params }: { params: { id: string } }) => {
  return (
    <DesainChangeEmail>
      <FormikChangeMailTenant id={params.id} />
    </DesainChangeEmail>
  );
};

export default ChangeEmailTenant;
