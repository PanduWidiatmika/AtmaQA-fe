import React, { useState } from "react";
// import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardImg,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { api } from "src/plugins/api";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);

      window.location.href = '/';
    } catch (error) {
      console.log(error)
      setError('Invalid email or password');
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {/* <CCard className='d-flex justify-content-center mb-4' style={{ height: '175', width: '50%', marginLeft: '25%' }}> */}
                  {/* <CCardImg className='card-img-top p-4' orientation="top" src={Logo}></CCardImg> */}
                  {/* </CCard> */}
                  <CForm onSubmit={(e) => handleSubmit(e)}>
                    <h3 className='text-center'>Point Reward</h3>
                    <br />
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={e => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol className='text-right'>
                        <CButton color="primary" type="submit">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginForm;