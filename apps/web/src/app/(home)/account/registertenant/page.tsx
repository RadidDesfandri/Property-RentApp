import React from "react";
import FormikComp from "./_components/Formik";
import DesainLoginRegisTenant from "../_components/DesainLoginRegisTenant";

const RegisterTenant = () => {
  return (
    <div className="bg-latar">
      <DesainLoginRegisTenant
        text1="Daftar"
        text2="Masuk"
        href="/account/logintenant"
        hrefTenant="/account/register"
        ket="Sudah"
        ketTenant="Pembeli"
        ketPembeli="Tenant"
      >
        <FormikComp />
      </DesainLoginRegisTenant>
    </div>
  );
};

export default RegisterTenant;
