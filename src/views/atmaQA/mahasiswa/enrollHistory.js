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
    CLabel,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupAppend,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';

const EnrollHistory = () => {

    const [data, setData] = useState([])
    const [userLog, setUserLog] = useState([])

    const history = useHistory();

    const token = localStorage.getItem('token');

    const getData = () => {
        api
            .post('/get-enroll-history', {
                id: userLog.mahasiswa_id,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                console.log(response);
                setData(response.data.enroll)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchKelas = (event) => {
        api
            .post('/search-kelas',
                {
                    name: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                setData(response.data.kelas)
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

    useEffect(() => {
        getUserRole()

    }, [])

    useEffect(() => {
        getData()
    }, [userLog.id])

    return (
        <div>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md="11">
                            <h3><b>Class</b></h3>
                        </CCol>
                        <CCol></CCol>
                    </CRow>
                    <CRow>
                        <CCol md="4">
                            <CInputGroup>
                                <CInput type="text" id="search" name="search" placeholder="Type to search by class name ..."
                                    onChange={(event) => searchKelas(event)}
                                />
                                <CInputGroupAppend>
                                    <CTooltip content={`Search`} placement={`top`}>
                                        <CButton className="btn-sm" type="submit" style={{ backgroundColor: "blue" }}><CIcon name="cil-magnifying-glass"
                                            style={{ color: "white" }}></CIcon></CButton>
                                    </CTooltip>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                        <CCol></CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    {
                        data == null ?
                            <div>
                                No Data Found
                            </div>

                            :
                            // <>ada data</>
                            <CDataTable
                                items={data}
                                fields={[
                                    { key: "No" },
                                    { key: "Class_Name" },
                                    { key: "Schedule" },
                                    { key: "Action" },
                                ]}
                                hover
                                bordered
                                size="sm"
                                itemsPerPage={4}
                                pagination
                                scopedSlots={{
                                    No: (item, i) => <td>{i + 1}</td>,
                                    Class_Name: (item) => <td>{item.kelas_name}</td>,
                                    Schedule: (item) => <td>{item.hari} - {item.sesi}</td>,
                                    'Action':
                                        (item) => (
                                            <td>
                                                <CTooltip
                                                    content="Class Detail"
                                                    placement="top"
                                                >
                                                    <CLink
                                                        className="card-header-action"
                                                        to={{ pathname: `/class/student-class-list/${item.kelas_id}` }}>
                                                        <CIcon content={freeSet.cilNewspaper} />
                                                    </CLink>
                                                </CTooltip>
                                                {/* <CTooltip
                                                    content="Update Class"
                                                    placement="top"
                                                >
                                                    <CLink
                                                        className="card-header-action"
                                                        to={{ pathname: `/class/class-list/edit-class/${item.kelas_id}` }}>
                                                        <CIcon content={freeSet.cilPencil} />
                                                    </CLink>
                                                </CTooltip> */}
                                                {/* <CTooltip
                                            content="Delete Mahasiswa"
                                            placement="top"
                                        >
                                            <CLink
                                                className="card-header-action"
                                            >
                                                <CIcon content={freeSet.cilTrash} />
                                            </CLink>
                                        </CTooltip> */}
                                            </td>
                                        )
                                }}
                            />
                    }

                </CCardBody>
            </CCard>
        </div>
    )
}

export default EnrollHistory;