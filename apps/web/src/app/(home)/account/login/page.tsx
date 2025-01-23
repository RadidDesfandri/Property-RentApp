import React from "react";
import FormikComp from "./_components/Formik";
import DesainLoginRegis from "../_components/DesainLoginRegis";

const Login = () => {
  return (
    <div className="bg-latar">
      <DesainLoginRegis
        text1="Masuk"
        text2="Daftar"
        href="/account/register"
        hrefTenant="/account/registertenant"
        ket="Belum"
        ketTenant="Tenant"
        ketPembeli="Pembeli"
      >
        <FormikComp />
      </DesainLoginRegis>
    </div>
  );
};

export default Login;
