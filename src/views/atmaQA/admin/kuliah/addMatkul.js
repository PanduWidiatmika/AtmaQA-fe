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
    CCardGroup,
    CFormGroup,
    CLabel,
    CSelect,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CIcon from '@coreui/icons-react'

const AddMatkul = () => {
    const token = localStorage.getItem('token');

    const [name, setName] = useState('')
    const [dosen, setDosen] = useState('')

    const [data, setData] = useState([])

    const history = useHistory();

    const createMatkul = (event) => {
        event.preventDefault();

        handleChange(event);

        console.log(data);

        api
            .post('/matkul',
                {
                    name: name,
                    dosen_id: dosen.dosen_id,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Course success!", "success");
                history.push('/course/course-list')
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setDosen(dosen => ({
            ...data,
            dosen_id: event.target.value
        }));
    }

    const getDataDosen = () => {
        api
            .get(`/dosen`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setData(response.data.dosen)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getDataDosen();
    }, [])

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Add Course</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: "/course/course-list" }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post"
                                    onSubmit={(event) => createMatkul(event)}
                                >
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Course Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    required
                                                    onChange={(event) => setName(event.target.value)}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Dosen Name</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select" onChange={(event) => handleChange(event)}>
                                                    <option value="" hidden>Select Dosen</option>
                                                    {
                                                        data.map((d, i) => {
                                                            return (
                                                                <option key={i} value={d.dosen_id}>{d.dosen_name}</option>
                                                            )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Create
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

export default AddMatkul;