'use client';
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./review.module.css";
import { useRouter } from "next/navigation";


export default function AddToList({lists,item}){
    const [open,setOpen] = useState(false);
    const [viewList,setViewList] = useState('public');
    const [username,setUsername] = useState("");
    const publicLists = lists.filter(item=>item.privacy === 'public');
    const privateLists = lists.filter(item=>item.privacy === 'private');
    const [selected, setSelected] = useState([]);
    const nav = useRouter();
    const [error,setError] = useState("");

    const handleSelectChange = (e)=>{
        const list = parseInt(e.target.value,10);
        setSelected(prev => (prev.includes(list) ? prev.filter(item=>item!==list) : [...prev,list]));
    }

    useEffect(()=>{
            const getData = async()=>{
                const res = await fetch("/api/me",{credentials:'include'});
                const json= await res.json();
                if(res.ok)
                    setUsername(json.username);
            }
            getData();
        },[]);

    const addToList = async()=>{
        const res = await fetch("/api/lists/add_race",{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({listIds:selected,race:item})
        });
        if(res.ok){
            nav.refresh();
            setOpen(false);            
        }else{
            const json=await res.json();
            setError(json.message);
        }
    }

    return(
        <>
            <p onClick={()=>setOpen(true)} className="phrase">Add to lists...</p>
            {open && 
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className={styles.top}>
                            <h2>Add the {item.season} {item.denomination} to lists</h2>
                            <h2 onClick={()=>setOpen(false)} className={styles.close}>X</h2>
                            <div className="controls">
                                <button type="button" onClick={()=>setViewList("public")}>Public</button>
                                <button type="button" onClick={()=>setViewList("private")}>Private</button>
                            </div>
                        </div>
                        <div className={styles.mid}>
                            <div className="list-item">
                                <Plus/>
                                <Link href={"/"+username+"/lists/new"}>New list...</Link>
                            </div>
                            {viewList === 'public' && publicLists.map(list =>(
                                <div className="list-item" key={list.id}>
                                    <input type="checkbox" name="selectedLists" value={list.id} checked={selected.includes(list.id) || list.races.includes(item.id)} onChange={handleSelectChange}
                                    disabled={ list.races.includes(item.id)}/>
                                    <p>{list.name}</p>
                                    <p>{list.races.length} races</p>
                                </div>
                            )) }
                            {viewList === 'private' && privateLists.map(list =>(
                                <div className="list-item" key={list.id}>
                                    <input type="checkbox" name="selectedLists" value={list.id} checked={selected.includes(list.id) || list.races.includes(item.id)} onChange={handleSelectChange}
                                    disabled={ list.races.includes(item.id)}/>
                                    <p>{list.name}</p>
                                    <p>{list.races.length} races</p>
                                </div>
                            )) }
                            
                        </div>
                        <div className={styles.last}>
                            {error && <p className="error">{error}</p> }
                            <button type="button" onClick={addToList}>Add</button>
                        </div>
                    </div>
                </div>  
            }
        </>
    )
}