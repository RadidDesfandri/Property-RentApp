import React from "react";
import FormikComp from "./_components/Formik";
import DesainLoginRegisTenant from "../_components/DesainLoginRegisTenant";

const Login = () => {
  return (
    <div className="bg-latar">
      <DesainLoginRegisTenant
        text1="Masuk"
        text2="Daftar"
        href="/account/registertenant"
        hrefTenant="/account/register"
        ket="Belum"
        ketTenant="Pembeli"
        ketPembeli="Tenant"
      >
        <FormikComp />
      </DesainLoginRegisTenant>
    </div>
  );
};

export default Login;
