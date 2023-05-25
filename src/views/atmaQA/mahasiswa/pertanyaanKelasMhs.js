import {
    CLink,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CCol,
    CRow,
    CTooltip,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CButton,
    CBadge,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import parse from 'html-react-parser';

const PertanyaanKelasMhs = () => {

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])

    const history = useHistory();

    const token = localStorage.getItem('token');

    const { classid, weekid } = useParams();

    const [pertanyaan, setPertanyaan] = useState([])

    const getDataKelas = () => {
        api
            .post(`/cek-kelas-minggu`, {
                weekid: weekid,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setKelas(response.data.kelas)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchPertanyaan = (event) => {
        api
            .post('/search-pertanyaan',
                {
                    name: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getUserRole = () => {
        api
            .get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUserLog(response.data.userloggedin)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getPertanyaanMhs = () => {
        // event.preventDefault()

        api
            .post(`/index-pertanyaan`, {
                mahasiswa_id: userLog.mahasiswa_id,
                minggukelas_id: weekid,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteQuestion = (id) => {
        swal({
            title: "Warning",
            text: "Deleted question cannot be restored!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    api
                        .post("/delete-pertanyaan", {
                            id: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(async (response) => {
                            await swal({ icon: "success", text: 'Question Deleted!' });
                            window.location.reload();
                        });
                } else {
                    await swal("Delete Question Cancelled!");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log("error");
            });
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
    }, [])

    useEffect(() => {
        getPertanyaanMhs()
    }, [userLog.id])

    return (
        <div>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md="9">
                            <h4><b>{kelas.kelas_name} - Week {weekid}</b></h4>
                        </CCol>
                        <CCol></CCol>
                        <CCol md="2" className="text-right">
                            <CLink to={{ pathname: `/class/student-class-list/${classid}` }}>
                                <CButton color="danger">Back</CButton>
                            </CLink>
                        </CCol>
                    </CRow>
                    <CRow>
                        <br></br>
                    </CRow>
                    <CRow>
                        <CCol md="4">
                        </CCol>
                        <CCol></CCol>
                        <CCol md="1">
                            <CTooltip
                                content="Add Questions"
                                placement="top"
                            >
                                <CButton
                                    className="card-header-action"
                                    onClick={() => { history.push(`/class/student-class-list/${classid}/${weekid}/add-student-question`) }}>
                                    <CIcon content={freeSet.cilPlus} />
                                </CButton>
                            </CTooltip>
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
                            <CDataTable
                                items={pertanyaan}
                                fields={[
                                    { key: "No" },
                                    { key: "Question" },
                                    { key: "Status" },
                                    { key: "Action" },
                                ]}
                                hover
                                bordered
                                size="sm"
                                itemsPerPage={4}
                                pagination
                                scopedSlots={{
                                    No: (item, i) => <td>{i + 1}</td>,
                                    Question: (item) => <td>
                                        {
                                            console.log(parse(item.question))
                                        }
                                        {
                                            // item.question.length > 25 ? `${parse(item.question).substring(0, 25)}...`
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
                                                        to={{ pathname: `/class/student-class-list/${classid}/${weekid}/question-detail/${item.pertanyaanmhs_id}` }}>
                                                        <CIcon content={freeSet.cilNewspaper} />
                                                    </CLink>
                                                </CTooltip>
                                                <CTooltip
                                                    content="Update Question"
                                                    placement="top"
                                                >
                                                    {
                                                        item.jawaban_dosen == null ?
                                                            <CLink
                                                                className="card-header-action"
                                                                to={{ pathname: `/class/student-class-list/${classid}/${weekid}/edit-question/${item.pertanyaanmhs_id}` }}>
                                                                <CIcon content={freeSet.cilPencil} />
                                                            </CLink>
                                                            :
                                                            <></>
                                                    }

                                                </CTooltip>
                                                <CTooltip
                                                    content="Delete Question"
                                                    placement="top"
                                                >
                                                    {
                                                        item.jawaban_dosen == null ?
                                                            <CLink
                                                                className="card-header-action"
                                                            >
                                                                <CIcon content={freeSet.cilTrash}
                                                                    onClick={(event) => deleteQuestion(item.pertanyaanmhs_id)}
                                                                />
                                                            </CLink>
                                                            :
                                                            <></>
                                                    }

                                                </CTooltip>
                                            </td>
                                        )
                                }}
                            />
                    }

                </CCardBody>
            </CCard>
        </div >
    )
}

export default PertanyaanKelasMhs;