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
    CInputRadio,
    CSelect
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const AddPertanyaanDsn = () => {
    const token = localStorage.getItem('token');

    const { id, weekid } = useParams()

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])
    const [pilihanA, setpilihanA] = useState([])
    const [pilihanB, setpilihanB] = useState([])
    const [pilihanC, setpilihanC] = useState([])
    const [correct, setCorrect] = useState([])

    const [questType, setQuestType] = useState('')

    const [numberOfQuestions, setNumberOfQuestions] = useState(0);

    // {
    // "0": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "1": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "2": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "3": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "4": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // }
    const [questions, setQuestions] = useState([]);


    const questionType = [
        {
            type: "Essay",
        },
        {
            type: "Multiple Choice",
        },
    ]

    const options = [
        {
            var: "A",
            type: "Option A",
        },
        {
            var: "B",
            type: "Option B",
        },
        {
            var: "C",
            type: "Option C",
        },
    ]

    const history = useHistory();

    const onChangeNumberOfQuestions = (e) => {
        const tempNumberOfQuestions = e.target.value;

        console.log('Sekarang pertanyaan jadi ' + tempNumberOfQuestions)
        setNumberOfQuestions(tempNumberOfQuestions);
        // Add logic to make the question stay
        // HERE
        if (tempNumberOfQuestions > 0) {
            var generatedArrays;
            // const generateArrays = Array.from(Array(Number(tempNumberOfQuestions)).keys())
            const generateArrays = Array.from(Array(Number(tempNumberOfQuestions)).keys()).map(val => ('Sample Pertanyaan ' + val))
            setQuestions(generateArrays);
        } else {
            setQuestions([])
        }
    };

    function addQuestionEssay() {
        // [1, 2, 3]
        // d = 0, 1, 2
        // i = 1, 2, 3
        return questions.map((val, i) => {
            return (
                <CRow key={i}>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Question {i + 1}</CInputGroupText>
                        </CCol>
                        <CCol>
                            <input value={val} onChange={(e) => { handleChangeEditorSimple(e, i) }} />
                        </CCol>
                    </CInputGroup>
                </CRow>
            );
        })
    }

    useEffect(() => {
        console.log(questions);
    }, [questions])

    const handleChangeEditorSimple = (e, index) => {
        setQuestions(questions.map((questions, i) => {
            if (i == index) {
                return e.target.value;
            } else {
                return questions
            }
        }));
        // setPertanyaan(editor.getData())
    }

    const addQuestion = (event) => {
        event.preventDefault()

        const tempid = weekid;

        api.post('/add-question-dsn', {
            //data
            pertanyaan: JSON.stringify(questions),
            id: tempid,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            //response
        })
    }

    // const handleChangeEditor = (editor, index) => {
    //     setQuestions(questions.map((questions, i) => {
    //         if (i == index) {
    //             console.log('Lagi edit questions ' + i + ' ya bang?')
    //             console.log('Datanya adalah : ' + editor.getData());
    //             return editor.getData();
    //         } else {
    //             return questions
    //         }
    //     }));
    //     // setPertanyaan(editor.getData())
    // }

    function addQuestionMulti() {
        return questions.map((d, i) => (
            <div key={i}>
                <CRow>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Question {i + 1}</CInputGroupText>
                        </CCol>
                        <CCol>
                            <CKEditor name="question" id={"question" + i}
                                editor={ClassicEditor}
                            // data={this.props.description}
                            // onChange={(event, editor) => { handleChangeEditor(editor) }}
                            />
                        </CCol>
                    </CInputGroup>
                </CRow>

                <CRow>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Option A</CInputGroupText>
                        </CCol>
                        <CCol>
                            <CInput
                                type="text"
                                placeholder="Alexa"
                                required
                            // defaultValue={kelas.kelas_name}
                            ></CInput>
                        </CCol>
                    </CInputGroup>
                </CRow>

                <CRow>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Option B</CInputGroupText>
                        </CCol>
                        <CCol>
                            <CInput
                                type="text"
                                placeholder="Alexa"
                                required
                            // defaultValue={kelas.kelas_name}
                            ></CInput>
                        </CCol>
                    </CInputGroup>
                </CRow>

                <CRow>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Option C</CInputGroupText>
                        </CCol>
                        <CCol>
                            <CInput
                                type="text"
                                placeholder="Alexa"
                                required
                            // defaultValue={kelas.kelas_name}
                            ></CInput>
                        </CCol>
                    </CInputGroup>
                </CRow>

                <CRow>
                    <CInputGroup className="mb-3">
                        <CCol md="3">
                            <CInputGroupText>Correct Answer</CInputGroupText>
                        </CCol>
                        <CCol>
                            <CSelect custom name="select" id="select"
                                // onChange={(event) => setSelected(event.target.value)}
                                required
                            >
                                <option value="" hidden>Select Answers</option>
                                {
                                    options.map((d, i) => {
                                        return (
                                            <option key={i} value={d.var}>{d.type}</option>
                                        )
                                    })
                                }
                            </CSelect>
                        </CCol>
                    </CInputGroup>
                </CRow>
            </div>
        ))
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

    const createQuestion = (event) => {
        event.preventDefault();

        api
            .post('/pertanyaan',
                {
                    // pertanyaan: pertanyaan,
                    // mahasiswa_id: userLog.mahasiswa_id,
                    // minggukelas_id: weekid,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Question success!", "success");
                // history.push(`/class/student-class-list/${classid}/${weekid}`)
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
    }, [])

    // console.log(questType);

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Add Question</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post"
                                    onSubmit={(event) => addQuestion(event)}
                                >
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="3">
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

                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CInputGroupText>Question Type </CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            {
                                                questionType.map((d, i) => {
                                                    return (
                                                        <CFormGroup variant="checkbox" key={i}>
                                                            <CInputRadio className="form-check-input" id={i} name="radios" value={d.type}
                                                                onChange={(event) => setQuestType(event.target.value)}
                                                                required />
                                                            <CLabel variant="checkbox" htmlFor={i}>{d.type}</CLabel>
                                                        </CFormGroup>
                                                    )
                                                })
                                            }
                                        </CCol>
                                    </CFormGroup>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="3">
                                                <CInputGroupText>Number of Questions</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    minLength={1}
                                                    maxLength={2}
                                                    placeholder="Enter Number of Questions Here . . ."
                                                    defaultValue={numberOfQuestions == 0 ? "" : numberOfQuestions}
                                                    onChange={onChangeNumberOfQuestions}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    {
                                        questType === "Essay"
                                            ?
                                            addQuestionEssay()
                                            :
                                            (
                                                questType === "Multiple Choice"
                                                    ?
                                                    addQuestionMulti()
                                                    // <>a</>
                                                    :
                                                    <h5>Please Choose The Question Type Above</h5>
                                            )

                                    }

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
        </div >
    )
}

export default AddPertanyaanDsn;