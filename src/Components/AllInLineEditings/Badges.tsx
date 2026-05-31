import React, { useEffect, useRef, useState } from "react"

type BadgesProps ={
    id: number,
    value: string,
    color: string,
    tableName: string,
    type: string,
    onSave: (tableName: string, id: number,value: string,chageingOne: string) => void
    badges: string[]
}

export const Badges = ({id, type, color, tableName, value, onSave, badges}: BadgesProps) =>{
    const [selectType , setSelectType] = useState<string>()
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null)

    useEffect(() =>{
        setSelectType(value);
    },[])

    const handleClick = () =>{
        setIsEditing(true)
    }
    
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectType(event.target.value);
        onSave(tableName, id, event.target.value,type)
        setIsEditing(false)
    }
    const handleBlur = () =>{
        onSave(tableName, id, selectType!,type)
        setIsEditing(false)
    }
    if(isEditing){
        return <select value={selectType}
            ref={selectRef}
            onBlur={handleBlur}
            onChange={(event) => handleOnChange(event)}
            style={{
                backgroundColor: 'transparent',
                color: "black",
                width: 'fit-content',
                height: '25px'
            }}
         >
            {
                badges.map((badge) => (
                    <option value={badge} key= {badge} >{badge}</option>
                ))
            }
        </select>
   
        
    }
    return <>
    <div>
        <p className="status" style={{ border: '2px solid ' + color }} onClick={handleClick} >{value}</p>
    </div>
    </>
}