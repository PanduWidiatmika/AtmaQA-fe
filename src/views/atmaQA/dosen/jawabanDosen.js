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
    CFormGroup,
    CLabel,
    CTextarea
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import DOMPurify from 'dompurify';
import '../mahasiswa/App.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const JawabanDosen = () => {
    const token = localStorage.getItem('token');

    const { id, weekid, questionid } = useParams()

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])
    const [pertanyaan, setPertanyaan] = useState({
        pertanyaan_mhs: "",
    })

    const [jawaban, setJawaban] = useState('')

    const history = useHistory();

    const answerQuestion = (event) => {
        event.preventDefault()

        api.post('/answer-question-mhs', {
            id: questionid,
            jawaban: jawaban,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async response => {
            await swal("Good job!", "Answer Question Success!", "success");
            history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}`)
        }).catch(error => {
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

    const getPertanyaan = () => {
        api
            .post(`/get-pertanyaan`, {
                pertanyaanmhs_id: questionid
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

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleChangeEditor = (editor) => {
        setJawaban(editor.getData())
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
        getPertanyaan()
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
                                        <h2>Answer Question</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post" onSubmit={(event) => answerQuestion(event)}>
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
                                                    defaultValue={kelas.kelas_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Question</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                {/* <CTextarea
                                                    name="textarea-input"
                                                    id="textarea-input"
                                                    rows="9"
                                                    placeholder="Type your question here..."
                                                    disabled
                                                    defaultValue={convertedText}
                                                /> */}
                                                <div className="preview"
                                                    dangerouslySetInnerHTML={createMarkup(pertanyaan.pertanyaan_mhs)}>
                                                </div>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Answer</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CKEditor name="description" id="description"
                                                    editor={ClassicEditor}
                                                    // data={this.props.description}
                                                    onChange={(event, editor) => { handleChangeEditor(editor) }}
                                                />
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Answer
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

export default JawabanDosen;