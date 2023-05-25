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
    CSelect,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditMatkul = () => {
    const token = localStorage.getItem('token');

    const { id } = useParams();

    const [data, setData] = useState([]) //get all dosen baru

    const [dataMatkul, setDataMatkul] = useState([]) //getmatkul

    const [crntDosen, setCrntDosen] = useState({}) //current dosen

    const [dosen, setDosen] = useState('') //set dosen baru

    const history = useHistory();

    const updateMatkul = (event) => {
        console.log(dataMatkul)
        console.log(dosen)
        event.preventDefault();

        api
            .put(`/matkul/${id}`,
                {
                    name: dataMatkul.matkul_name,
                    dosen_id: crntDosen.dosen_id,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Update Course success!", "success");
                history.push('/course/course-list')
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setCrntDosen(crntDosen => ({
            ...crntDosen,
            dosen_id: event.target.value,
            // dosen_name: event.target.html
        }));
    }

    useEffect(() => {
        const getData = () => {
            api
                .get(`/matkul/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setDataMatkul(response.data.matkul)
                    setCrntDosen(response.data.dosen)
                })
                .catch(error => {
                    console.log(error);
                })
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

        getData();
        getDataDosen();
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
                                        <h2>Edit Course</h2>
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
                                    onSubmit={(event) => updateMatkul(event)}
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
                                                    defaultValue={dataMatkul.matkul_name}
                                                    onChange={(event) => {
                                                        setDataMatkul({
                                                            ...dataMatkul,
                                                            matkul_name: event.target.value,
                                                        });
                                                    }}
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
                                                    <option value={crntDosen.dosen_id} hidden>{crntDosen.dosen_name}</option>
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

export default EditMatkul;