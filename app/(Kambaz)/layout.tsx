"use client"
import Session from "./Account/Session";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import Breadcrumb from "./Courses/[cid]/Breadcrumb";
export default function KambazLayout({ 
  children 
}: Readonly<{ children: ReactNode }>) {
 return (
  <Provider store={store}>
    <Session>
  <div id="wd-kambaz">
   <div className="d-flex">

    <div>
           <KambazNavigation /> 
           </div>

           <div className="flex-fill wd-main-content-offset ps-3 ">
         {children}   
         </div>  
         </div>      
   </div>
   </Session>
   </Provider>
);}
