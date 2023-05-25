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
    CDataTable,
    CTooltip,

} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const EnrollClassWeek = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        kelas_name: '',
        matkul_name: '',
        dosen_name: ''
    })

    const [week, setWeek] = useState([])

    const { classid } = useParams();


    useEffect(() => {
        const getData = () => {
            api
                .post(`/get-student-class-detail`, {
                    id: classid,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.kelas)
                    setWeek(response.data.week)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
    }, [classid])

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Class Detail</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: "/class/student-class-list" }}>
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

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Course</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Course Name"
                                                    disabled
                                                    defaultValue={data.matkul_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Lecture Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Lecture Name"
                                                    disabled
                                                    defaultValue={data.dosen_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                </CForm>
                                <CCardHeader>
                                    <CRow>
                                        <CCol md="10">
                                            <h2>Weeks</h2>
                                        </CCol>
                                        {/* <CCol md="2" className="text-right">
                                            <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/open-class` }}>
                                                <CButton color="primary">Open Class</CButton>
                                            </CLink>
                                        </CCol> */}
                                    </CRow>
                                </CCardHeader>
                                <CCardBody>
                                    {
                                        data == null ?
                                            <div>
                                                No Data Found
                                            </div>

                                            :
                                            <CDataTable
                                                items={week}
                                                fields={[
                                                    { key: "No" },
                                                    { key: "Week" },
                                                    // { key: "Class_Status" },
                                                    { key: "Action" },
                                                ]}
                                                hover
                                                bordered
                                                size="sm"
                                                itemsPerPage={4}
                                                pagination
                                                scopedSlots={{
                                                    No: (item, i) => <td>{i + 1}</td>,
                                                    Week: (item) => <td>Week - {item.minggu_ke}</td>,
                                                    // Class_Status: (item) => <td>{item.status_kelas}</td>,
                                                    // Schedule: (item) => <td>{item.hari} - {item.sesi}</td>,
                                                    'Action':
                                                        (item) => (
                                                            <td>
                                                                <CTooltip
                                                                    content="Class Detail"
                                                                    placement="top"
                                                                >
                                                                    <CLink
                                                                        className="card-header-action"
                                                                        to={{ pathname: `/class/student-class-list/${classid}/${item.minggukelas_id}` }}>
                                                                        <CIcon content={freeSet.cilNewspaper} />
                                                                    </CLink>
                                                                </CTooltip>
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

export default EnrollClassWeek;