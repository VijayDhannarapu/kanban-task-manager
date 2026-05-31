import { useEffect, useRef, useState } from "react"
import { successToast } from "../Toast"
import React from "react";

type InlineEditingProps = {
    type: string,
    value: string | undefined,
    taskId: number,
    tableName: string
    onSave: (tableName: string, id: number, title: string,chageingOne: string) => void,
}

export const InlineEditing = React.memo(({ type, value, taskId, tableName, onSave }: InlineEditingProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>()

    useEffect(() => {
        if (isEditing) {
            if (type === 'title') {
                inputRef.current?.focus()
            }
            else {
                textareaRef.current?.focus()
            }
        }
    }, [isEditing])

    useEffect(() => {
        setInputValue(value)
    }, [])

    const handleClick = () => {
        setIsEditing(true);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement >) => {
        if (event.key === 'Enter') {
            if (type === 'title') {
                onSave!(tableName, taskId, inputValue!,'title')
                successToast('Title Updated')
                setIsEditing(false)
            }
        }
    }

    const handleBlur = () => {
        if(value !== inputValue){
            onSave!(tableName, taskId, inputValue!,type);
            (type === 'title')
                ? successToast('Title Updated') 
                : successToast('Discription Updated')
        }
        setIsEditing(false)
    }

    if (isEditing) {
        switch (type) {
            case 'title':
                return <>
                    <input type="text" ref={inputRef} value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onFocus={(event) => event.target.select()}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            fontSize: '20px',
                            border: ' 2px solid rgba(77, 77, 77, 0.204)',
                            borderRadius: '5px',
                            padding: '2px 2px'
                        }}
                    />
                </>
            case 'discription':
                return <>
                    <textarea ref={textareaRef}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onBlur={handleBlur}
                        style={{
                            fontSize: '15px',
                            backgroundColor: 'transparent',
                            color: "black",
                            width: '90%',
                            height: '100px',
                            resize: 'none',
                        }}
                    ></textarea>
                </>
        }
    }
    
    return <div>
        <p className={type === 'title' ? "taskName" : "discription"} onClick={handleClick} >
            {(inputValue?.length ?? 0) > 50
                ? inputValue?.substring(0, 80) + '...'
                : inputValue}
        </p>

    </div>
})

