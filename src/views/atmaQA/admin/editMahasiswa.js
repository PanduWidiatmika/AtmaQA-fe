import React from "react";
import {
    CButton,
    CCard,
    CCol,
    CCardHeader,
    CLink,
    CRow,
    CCardBody,
    CForm,
    CInputGroup,
    CInput,
    CInputGroupText,
    CInputGroupPrepend,
    CCardGroup,
    CContainer,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditMahasiswa = () => {
    const token = localStorage.getItem('token');

    const { id } = useParams();

    const [data, setData] = useState({
        mahasiswa_name: '',
        npm: '',
        email_mahasiswa: '',
        password_mahasiswa: '',
    })

    const history = useHistory();

    const updateMahasiswa = (event) => {
        event.preventDefault();

        api
            .put(`/mahasiswa/${id}`,
                {
                    name: data.mahasiswa_name,
                    npm: data.npm,
                    email: data.email_mahasiswa,
                    password: data.password_mahasiswa,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Update Mahasiswa success!", "success");
                history.push('/mahasiswa/mahasiswa-list')
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        const getData = () => {
            api
                .get(`/mahasiswa/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.mahasiswa)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
    }, [id])

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Edit Mahasiswa</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: "/mahasiswa/mahasiswa-list" }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post"
                                    onSubmit={(event) => updateMahasiswa(event)}
                                >
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    required
                                                    defaultValue={data.mahasiswa_name}
                                                    // value={data.mahasiswa_name}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            mahasiswa_name: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>NPM</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="190xxxxxx"
                                                    required
                                                    // defaultValue={data.npm}
                                                    value={data.npm}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            npm: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Email</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="email"
                                                    placeholder="alexa@email.com"
                                                    required
                                                    // defaultValue={data.email_mahasiswa}
                                                    value={data.email_mahasiswa}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            email_mahasiswa: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Password</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="password"
                                                    required
                                                    defaultValue={data.password_mahasiswa}
                                                    // value={data.password_mahasiswa}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            password_mahasiswa: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>
                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Update
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div>
    )
}

export default EditMahasiswa;