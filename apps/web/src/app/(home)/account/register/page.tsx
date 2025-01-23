import React from "react";
import FormikComp from "./_components/Formik";
import DesainLoginRegis from "../_components/DesainLoginRegis";

const Register = () => {
  return (
    <div className="bg-latar">
      <DesainLoginRegis
        text1="Daftar"
        text2="Masuk"
        href="/account/login"
        hrefTenant="/account/registertenant"
        ket="Sudah"
        ketTenant="Tenant"
        ketPembeli="Pembeli"
      >
        <FormikComp />
      </DesainLoginRegis>
    </div>
  );
};

export default Register;
