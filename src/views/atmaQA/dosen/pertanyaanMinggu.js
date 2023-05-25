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
    CLabel,
    CFormGroup,
    CInputRadio,
    CDataTable,
    CTooltip,
    CBadge,
    // CFormCheck,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import parse from 'html-react-parser';

const PertanyaanMinggu = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        kelas_name: '',
        hari: '',
        sesi: '',
    })

    const [matkul, setMatkul] = useState({
        matkul_name: '',
        dosen_name: '',
    })

    const { id, weekid } = useParams();

    const history = useHistory();

    const [week, setWeek] = useState([])
    const [pertanyaan, setPertanyaan] = useState([])

    // console.log(weekid);
    // console.log(id);

    useEffect(() => {
        const getData = () => {
            api
                .get(`/kelas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.kelas)
                    setMatkul(response.data.matkul)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const getWeek = () => {
            api
                .post(`/getOne-week`, {
                    weekid: weekid
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setWeek(response.data.week)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        api.post('/get-pertanyaan-mhs', {
            minggukelas_id: weekid,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setPertanyaan(response.data.question)
        }).catch(error => {
            console.log(error);
        })

        getData();
        getWeek()
    }, [id])

    // console.log(week);

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Week {week.week}</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post">
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Class Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    disabled
                                                    defaultValue={data.kelas_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    {/* <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Day</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Day"
                                                    disabled
                                                    defaultValue={data.hari}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Session</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Session"
                                                    disabled
                                                    defaultValue={data.sesi}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow> */}

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Status</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Session"
                                                    disabled
                                                    defaultValue={week.class_status}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>
                                </CForm>

                                <CCardHeader>
                                    <CRow>
                                        <CCol md="8">
                                            <h2>Questions</h2>
                                        </CCol>
                                        <CCol md="4" className="text-right">
                                            <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/add-question` }}>
                                                <CButton color="primary">Add Question</CButton>
                                            </CLink>
                                        </CCol>
                                    </CRow>
                                </CCardHeader>
                                <CCardBody>
                                    {
                                        pertanyaan == null ?
                                            <div>
                                                No Data Found
                                            </div>
                                            :
                                            // <>a</>
                                            <CDataTable
                                                items={pertanyaan}
                                                fields={[
                                                    { key: "No" },
                                                    { key: "npm" },
                                                    { key: "Question" },
                                                    { key: 'Status' },
                                                    { key: "Action" },
                                                ]}
                                                hover
                                                bordered
                                                size="sm"
                                                itemsPerPage={4}
                                                pagination
                                                scopedSlots={{
                                                    No: (item, i) => <td>{i + 1}</td>,
                                                    // Npm: (item) => <td> {item.npm} </td>,
                                                    Question: (item) => <td>
                                                        {
                                                            // item.question.length > 25 ? `${item.question.substring(0, 25)}...`
                                                            //     :
                                                            parse(item.question)
                                                        }
                                                    </td>,
                                                    Status: (item) => <td>{
                                                        item.jawaban_dosen == null ? <CBadge color="danger">Unanswered</CBadge> : <CBadge color="success">Answered</CBadge>
                                                    }</td>,
                                                    'Action':
                                                        (item) => (
                                                            <td>
                                                                <CTooltip
                                                                    content="Question Detail"
                                                                    placement="top"
                                                                >
                                                                    <CLink
                                                                        className="card-header-action"
                                                                        to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/question-detail/${item.pertanyaanmhs_id}` }}>
                                                                        <CIcon content={freeSet.cilNewspaper} />
                                                                    </CLink>
                                                                </CTooltip>
                                                                {
                                                                    item.jawaban_dosen == null ?
                                                                        <CTooltip
                                                                            content="Answer Question"
                                                                            placement="top"
                                                                        >
                                                                            <CLink
                                                                                className="card-header-action"
                                                                                to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/answer-question/${item.pertanyaanmhs_id}` }}>
                                                                                <CIcon content={freeSet.cilPencil} />
                                                                            </CLink>
                                                                        </CTooltip>
                                                                        :
                                                                        <></>
                                                                }

                                                                {/* <CTooltip
                                                                    content="Delete Question"
                                                                    placement="top"
                                                                >
                                                                    <CLink
                                                                        className="card-header-action"
                                                                    >
                                                                        <CIcon content={freeSet.cilTrash}
                                                                            onClick={(event) => deleteQuestion(item.pertanyaanmhs_id)}
                                                                        />
                                                                    </CLink>
                                                                </CTooltip> */}
                                                            </td>
                                                        )
                                                }}
                                            />
                                    }

                                </CCardBody>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div >
    )
}

export default PertanyaanMinggu;