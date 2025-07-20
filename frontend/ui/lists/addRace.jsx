'use client';

import * as React from 'react';
import { Trash } from "lucide-react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SelectedRaceItem from './selectedRace';
import styles from "@/app/[username]/lists/list.module.css";

export default function AddRace({ races,selectedIds,setSelectedIds, ranked }) {

    const getSelectedRaces = () => 
        races.filter(race => selectedIds.includes(race.id));
    const removeRace = (id)=> 
        setSelectedIds(selectedIds.filter( item =>item!==id));

    return (
        <>
            <Autocomplete
                multiple
                options={races}
                getOptionLabel={(option) => option.denomination +" "+option.season}
                value={getSelectedRaces()}
                onChange={(e, newValue) => {
                    const ids = newValue.map(race => race.id);
                    setSelectedIds(ids);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Add a new race..."
                        placeholder="Race name + season"
                    />
                )}
                renderTags={()=>null}
                sx={{
                    borderRadius: 4,
                    width:'calc(50% - 3em)',
                    backgroundColor: 'var(--color-surface)',
                    boxShadow:'var(--shadow-elevation)',
                    borderBottom:'1px solid var(--color-border)',
                    color:'white',
                    '& label':{
                        color:'var(--color-text-primary)',
                    },
                    '& input::placeholder':{
                        color:'white',
                    },
                    '& input':{
                        color:'white',
                    },
                    
                    '& label.Mui-focused': {
                        color: 'rgb(255, 255, 255)',
                    },
                    '& svg': {
                        color: 'var(--color-text-primary)',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        borderColor: 'transparent',
                    },    
                }}
            />

            <div className={styles["race-box"]}>
                {
                    selectedIds.length > 0 ?getSelectedRaces().map((item,i)=>(
                        <div className={styles.item} key={item.id}>
                            <div>
                                { ranked ? <h2>{i+1}</h2> : null}
                                <SelectedRaceItem data={item}/>
                            </div>
                            <Trash onClick={()=>removeRace(item.id)}/>        
                        </div>
                        ))
                        :
                        <div className={styles.empty}>
                            <h2>Your list is empty.</h2>
                            <i>Add races using the field above.</i>
                        </div>
            }
            </div>
        </>
        
    );
}
