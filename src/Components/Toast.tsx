import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const successToast = (message: string, color?: string) => {
    toast.success(message, {
        style:{
            boxShadow : '0 3px 5px gray',
        },
        iconTheme: {
            primary: color??'#36ed61',
            secondary: '#FFFAEE',
        }
    });
}
export const errorToast = (message: string) => {
    toast.error(message);
}

export const Toast = React.memo(() => {
    return <Toaster position="top-center"
        reverseOrder={false}
         />
}
)