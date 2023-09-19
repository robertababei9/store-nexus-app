import { useState, useEffect } from 'react';
import { Button, Card, Layout } from "src/components/_shared"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { TextField } from "@mui/material";
import { HashLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { loggedOut, setNeedsToCreateCompany } from 'src/features/authentication/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { getDefaultApiUrl } from 'src/config';
import { CreateCompanyType } from 'src/types/company';
import { openNotification } from 'src/utils/Notification';
import { ROUTES } from 'src/utils/Constants';

const FadeAnimation = require('react-reveal/Fade');
const Jump = require('react-reveal/Jump');

type CreateCompanyFormType = {
    name: string;
    noEmployees: number;
    type: string;
}

export default function CreateCompany() {

    //redux
    const dispatch = useDispatch();

    // routing
    const navigate = useNavigate();

    // form
    const methods = useForm<CreateCompanyFormType>();

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

    const handleNext = async () => {
        const canContinue = await methods.trigger();
        if (canContinue == false) {
            return;
        }

        setStep(prev => prev + 1);
    }

    const handleBack = () => {
        setStep(prev => prev - 1);
    }

    const handleCreate = async () => {

        const canContinue = await methods.trigger();
        if (canContinue == false) {
            return;
        }

        setCreateAnimation(prev => !prev);
        setIsCompanyCreating(true);
        
        await delay(2000); // Wait for that nice loader ...
        // rtk query -> API to set company and then invalidate 'needsToCreateCompany' field by API call 

        try { 
            const formValues = methods.getValues();
            const body: CreateCompanyType = {
                name: formValues.name,
                noEmployees: formValues.noEmployees,
                type: formValues.type
            };
            const result = await axios.post<string>(`${getDefaultApiUrl()}/api/company/create`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                } 
            });

            if (result) {
                dispatch(setNeedsToCreateCompany(false));   // company was created
                navigate("/")
            }
        } 
        catch (err: any) {
            console.log("Error while creating the company: ", err);

            dispatch(loggedOut(null));
            navigate(ROUTES.SignIn);
            openNotification("error", "Error", "Error while creating the company. Log in again and try one more time. If this error persist please contact support", 10)
        }
        finally {

        }


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
                                <Controller
                                    name={`name`}
                                    control={methods.control}
                                    rules={{
                                    required: true
                                    }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            className='w-full'
                                            style={{marginBottom: 15}}
                                            label='What is the name of the company ?' 
                                            variant="outlined"
                                            value={value}
                                            onChange={(event) => {
                                                onChange(event.target.value);
                                            }}
                                            error={error?.message !== undefined}
                                            size='small'
                                            required
                                        />
                                    )}
                                />
                            )
                        }

                        {
                            step === 1 && (
                                <Controller
                                    name={`noEmployees`}
                                    control={methods.control}
                                    rules={{
                                    required: true
                                    }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <FadeAnimation top>
                                            <TextField
                                                className='w-full'
                                                style={{marginBottom: 15}}
                                                label='How many employees the company has ?' 
                                                variant="outlined"
                                                type='number'
                                                value={value}
                                                onChange={(event) => {
                                                    onChange(event.target.value);
                                                }}
                                                error={error?.message !== undefined}
                                                size='small'
                                                required
                                            />
                                        </FadeAnimation>
                                    )}
                                />

                            )
                        }

                        {
                            step === 2 && (
                                <Controller
                                name={`type`}
                                control={methods.control}
                                rules={{
                                required: true
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <FadeAnimation top>
                                        <TextField
                                            className='w-full'
                                            style={{marginBottom: 15}}
                                            label="What's the type of business ?"
                                            variant="outlined"
                                            value={value}
                                            onChange={(event) => {
                                                onChange(event.target.value);
                                            }}
                                            error={error?.message !== undefined}
                                            size='small'
                                            required
                                        />
                                    </FadeAnimation>
                                )}
                            />

                            )
                        }

                        {/* BACK, NEXT, CREATE --> buttons */}
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
