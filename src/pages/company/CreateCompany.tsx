import { useState, useEffect } from 'react';
import { Button, Card, Layout } from "src/components/_shared"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { TextField } from "@mui/material";
import { HashLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setNeedsToCreateCompany } from 'src/features/authentication/authenticationSlice';
import { useNavigate } from 'react-router-dom';

const FadeAnimation = require('react-reveal/Fade');
const Jump = require('react-reveal/Jump');

const TOTAL_STEPS = [0, 1, 2];

export default function CreateCompany() {

    //redux
    const dispatch = useDispatch();

    // routing
    const navigate = useNavigate();

    // states
    const [companyName, setCompanyName] = useState<string>("");
    const [noEmployees, setNoEmployees] = useState<string>("");
    const [typeOfBusinees, setTypeOfBusinees] = useState<string>("");
    const [step, setStep] = useState<number>(0);

    const [createAnimation, setCreateAnimation] = useState<boolean>(false);
    const [isCompanyCreating, setIsCompanyCreating] = useState<boolean>(false);

    useEffect(() => {
        setCreateAnimation(prev => !prev);
    }, []);

    const handleNext = () => {
        setStep(prev => prev + 1);
    }

    const handleBack = () => {
        setStep(prev => prev - 1);
    }

    const handleCreate = async () => {
        setCreateAnimation(prev => !prev);
        setIsCompanyCreating(true);
        
        await delay(2000); // Wait for that nice loader ...
        // rtk query -> API to set company and then invalidate 'needsToCreateCompany' field by API call 

        dispatch(setNeedsToCreateCompany(false));   // company was created
        navigate("/")
    }

    // helpers
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms) );

    return (
        <Layout className={`justify-center items-center relative`}>
            {
                isCompanyCreating && (
                    <FadeAnimation up>
                        <HashLoader 
                            color="#3657F8"
                            size={95}
                        />
                    </FadeAnimation>
                )
            }
            <FadeAnimation left when={createAnimation}>
                <div >
                    <Card >
                        <p className="text-lg text-gray-600 font-semibold mb-6">Looks like you need to create the company first. Give us some details</p>
                        {
                            step === 0 && (
                                <TextField
                                    className='w-full'
                                    style={{marginBottom: 15}}
                                    label='What is the name of the company ?' 
                                    variant="outlined"
                                    value={companyName}
                                    onChange={(event) => {
                                        setCompanyName(event.target.value);
                                    }}
                                    // error={error !== undefined}
                                    size='small'
                                    required
                                />
                            )
                        }

                        {
                            step === 1 && (
                                <FadeAnimation top>
                                    <TextField
                                        className='w-full'
                                        style={{marginBottom: 15}}
                                        label='How many employees company has ?' 
                                        variant="outlined"
                                        value={noEmployees}
                                        onChange={(event) => {
                                            setNoEmployees(event.target.value);
                                        }}
                                        // error={error !== undefined}
                                        size='small'
                                        required
                                    />
                                </FadeAnimation>
                            )
                        }

                        {
                            step === 2 && (
                                <FadeAnimation top>
                                    <TextField
                                        className='w-full'
                                        style={{marginBottom: 15}}
                                        label="What's the type of business ?" 
                                        variant="outlined"
                                        value={typeOfBusinees}
                                        onChange={(event) => {
                                            setTypeOfBusinees(event.target.value);
                                        }}
                                        // error={error !== undefined}
                                        size='small'
                                        required
                                    />
                                </FadeAnimation>
                            )
                        }

                        <div className="w-full flex justify-between items-center mt-6">
                            {
                                [1, 2].includes(step) ? (
                                    <Button type="secondary" className="flex items-center" onClick={handleBack}>
                                        <AiOutlineArrowLeft className="mr-2" size={16}/>
                                        Back
                                    </Button>
                                ) : (<div className='none'></div>)
                            }

                            {
                                [0,1].includes(step) ? (
                                    <Button type="secondary" className="flex items-center" onClick={handleNext}>
                                        Next
                                        <AiOutlineArrowRight className="ml-2" size={16}/>
                                    </Button>
                                ) : (<></>)
                            }

                            {
                                step === 2 ? (
                                    <Jump>
                                        <Button type="secondary" className={`flex items-center scale-125`} onClick={handleCreate}>
                                            Create
                                            <IoCreateOutline className="ml-2" size={16}/>
                                        </Button>
                                    </Jump>
                                ) : (<></>)
                            }

                        </div>
                    </Card>
                </div>
            </FadeAnimation>
        </Layout>
    )
}
