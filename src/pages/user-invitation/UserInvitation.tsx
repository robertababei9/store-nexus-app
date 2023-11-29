import { useState, useEffect } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { FiUserCheck } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button, Card, Layout } from "src/components/_shared"
import { UserInvitationFormType } from 'src/types/userInvitation';
import FirstStep from 'src/components/user-invitation/FirstStep';
import SecondStep from 'src/components/user-invitation/SecondStep';

const FadeAnimation = require('react-reveal/Fade');
const Jump = require('react-reveal/Jump');



export default function UserInvitation() {

    // routing
    const navigate = useNavigate();

    // form
    const methods = useForm<UserInvitationFormType>();

    methods.watch("Password");
    methods.watch("PasswordConfirm");

    // states
    const [step, setStep] = useState<number>(0);

    const [createAnimation, setCreateAnimation] = useState<boolean>(false);

    useEffect(() => {
      setCreateAnimation(prev => !prev);
  }, []);

    // steps
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
        
        await delay(2000); // Wait for that nice loader ...
        // rtk query -> API to set company and then invalidate 'needsToCreateCompany' field by API call 

        try { 
            const formValues = methods.getValues();
            
        } 
        catch (err: any) {
            // console.log("Error while creating the company: ", err);
            // openNotification("error", "Error", "Error while creating the company. Log in again and try one more time. If this error persist please contact support", 10)
        }
        finally {

        }


    }

    // helpers
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms) );

    return (
        <Layout className={`justify-center items-center relative`}>
            <FadeAnimation left when={createAnimation}>
                <div >
                    <Card >
                      {/* TITLE */}
                        {
                          step === 0 && (
                            <p className="text-lg text-gray-600 font-semibold mb-6">Looks like you need to create your account. Give us some details</p>
                          )
                        }
                        {
                          step === 1 && (
                            <p className="text-lg text-gray-600 font-semibold mb-6">Also create your password and you're ready to go</p>
                          )
                        }

                        {/* BODY */}
                        {
                            step === 0 && (
                                <FirstStep methods={methods}/>
                            )
                        }

                        {
                            step === 1 && (
                              <SecondStep methods={methods} />
                            )
                        }

                        {
                            step === 2 && (
                              <div></div>
                            )
                        }

                        {/* BACK, NEXT, CREATE --> buttons */}
                        <div className="w-full flex justify-between items-center mt-6">
                            {
                                [1].includes(step) ? (
                                    <Button type="secondary" className="flex items-center" onClick={handleBack}>
                                        <AiOutlineArrowLeft className="mr-2" size={16}/>
                                        Back
                                    </Button>
                                ) : (<div className='none'></div>)
                            }

                            {
                                [0].includes(step) ? (
                                    <Button type="secondary" className="flex items-center" onClick={handleNext}>
                                        Next
                                        <AiOutlineArrowRight className="ml-2" size={16}/>
                                    </Button>
                                ) : (<></>)
                            }

                            {
                                step === 1 ? (
                                    <Jump>
                                        <Button type="secondary" className={`flex items-center scale-125`} onClick={handleCreate}>
                                            Create
                                            <FiUserCheck className="ml-2" size={16}/>
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
