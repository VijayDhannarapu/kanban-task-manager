import { useEffect, useState } from "react"

type DateInLineEditProps ={
    id: number,
    value: string,
    tableName: string,
    onSave: (tableName: string, id: number,value: string,chageingOne: string) => void
}

export const DateInLineEdit = ({id,value,tableName,onSave}: DateInLineEditProps) =>{
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputDate, setInputDate] = useState<string>()
    useEffect(() =>{
        setInputDate(value);
    },[])

    const handleDate = () => {
        setIsEditing(true)
    }
    const handleInputDate = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>{
        setInputDate(event.target.value.split('-').reverse().join('-'))
        onSave(tableName, id, event.target.value.split('-').reverse().join('-'),'date')
        setIsEditing(false)
    }

    const handleBlur = () =>{
        if(inputDate !== value){
            console.log('no not same')
            onSave(tableName, id, inputDate!,'date')
        }
        setIsEditing(false)
    }
    if(isEditing){
        return <input type="date" 
        onChange={(event) => handleInputDate(event)}
        onBlur={handleBlur}
        style={{
            height: '1.5rem',
            marginTop: '15px'
        }}
        />
    }
    return <div>
        <p className="date"
        onClick={handleDate}
        style={{border: '2px solid gray'}}
        >
            
    {value}</p>
    </div>
}