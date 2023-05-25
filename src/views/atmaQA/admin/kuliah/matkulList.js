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

const MatKulList = () => {
    const [data, setData] = useState([])

    const history = useHistory();

    const token = localStorage.getItem('token');

    const getData = () => {
        api
            .get('/matkul', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setData(response.data.matkul)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchMatkul = (event) => {
        api
            .post('/search-matkul',
                {
                    name: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                setData(response.data.matkul)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md="11">
                            <h3><b>Course</b></h3>
                        </CCol>
                        <CCol></CCol>
                    </CRow>
                    <CRow>
                        <CCol md="4">
                            <CInputGroup>
                                <CInput type="text" id="search" name="search" placeholder="Type to search by course name ..."
                                    onChange={(event) => searchMatkul(event)}
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
                        <CCol md="1">
                            <CTooltip
                                content="Add Course"
                                placement="top"
                            >
                                <CButton
                                    className="card-header-action"
                                    onClick={() => { history.push('/course/course-list/add-course') }}>
                                    <CIcon content={freeSet.cilPlus} />
                                </CButton>
                            </CTooltip>
                        </CCol>
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
                                items={data}
                                fields={[
                                    { key: "No" },
                                    { key: "matkul_name" },
                                    { key: "dosen_name" },
                                    { key: "action" },
                                ]}
                                hover
                                bordered
                                size="sm"
                                itemsPerPage={4}
                                pagination
                                scopedSlots={{
                                    No: (item, i) => <td>{i + 1}</td>,
                                    // course_Name: (item) => <td>{item.matkul_name}</td>,
                                    // lecture_Name: (item) => <td>{item.dosen_name}</td>,
                                    'action':
                                        (item) => (
                                            <td>
                                                {/* <CTooltip
                                                    content="Dosen Detail"
                                                    placement="top"
                                                >
                                                    <CLink
                                                        className="card-header-action"
                                                        to={{ pathname: `/dosen/dosen-list/dosen-detail/${item.dosen_id}` }}>
                                                        <CIcon content={freeSet.cilNewspaper} />
                                                    </CLink>
                                                </CTooltip> */}
                                                <CTooltip
                                                    content="Update Course"
                                                    placement="top"
                                                >
                                                    <CLink
                                                        className="card-header-action"
                                                        to={{ pathname: `/course/course-list/edit-course/${item.matkul_id}` }}>
                                                        <CIcon content={freeSet.cilPencil} />
                                                    </CLink>
                                                </CTooltip>
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

export default MatKulList;