import { useState } from 'react';
import { Checkbox, Col, Row } from "antd";
import { Card } from "../_shared";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormType, ItemType } from "src/types/invoices";
import { AppLogo } from "../_shared/Icons/Icons";
import { formatPrice } from "src/utils/Utils";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setSendEmail } from 'src/features/invoices/invoicesSlice';
import InvoiceTemplateDefault from './InvoiceTemplateDefault';

type CreateInvoiceStepTwoProps = {
    // To add when necessary
}
  


export default function CreateInvoiceStepTwo({

}: CreateInvoiceStepTwoProps) {

  return (
    <>
        <InvoiceTemplateDefault showSendEmail={true}/>
    </>
  )
}
