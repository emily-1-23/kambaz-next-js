/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { RootState } from "../store";

export default function AccountPage() {
 const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
 if (!currentUser) {
   redirect("/Account/Signin");
 } else {
   redirect("/Account/Profile");
 }
}