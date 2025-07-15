'use client';
import { useFormStatus } from "react-dom";

export default function SubmitButton({text}){
    const {isPending}=useFormStatus();
    return <button type="submit" disabled={isPending}>{isPending ? "..." : text}</button>
}