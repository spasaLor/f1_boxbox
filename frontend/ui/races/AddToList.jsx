'use client';
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./review.module.css";
import { useRouter } from "next/navigation";
import listStyles from "../lists/lists.module.css";


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

    useEffect(() => {
        const preSelected = lists
            .filter(list => list.races.includes(item.id))
            .map(list => list.id);
        setSelected(preSelected);
    }, [lists, item.id]);


    const addToList = async()=>{
        const res = await fetch("/api/lists/add_race",{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({listIds:selected,raceId:item.id})
        });
        if(res.ok){
            nav.refresh();
            setOpen(false);            
        }else{
            const json=await res.json();
            setError(json.message);
        }
    }

    console.log(selected);
    return(
        <>
            <p onClick={()=>setOpen(true)} className={styles.phrase}>Add to lists...</p>
            {open && 
                <div className={styles.container}>
                    <div className={listStyles.inner}>
                        <div className={listStyles.top}>
                            <div className={listStyles.title}>
                                <h2>Add the {item.season} {item.denomination} to lists</h2>
                                <h2 onClick={()=>setOpen(false)} className={styles.close}>X</h2>
                            </div>
                            <div className={listStyles.controls}>
                                <button type="button" onClick={()=>setViewList("public")} className={viewList === "public" ? listStyles.active : null}>Public</button>
                                <button type="button" onClick={()=>setViewList("private")} className={viewList === "private" ? listStyles.active : null}>Private</button>
                            </div>
                        </div>
                        <div className={listStyles.mid}>
                            <div className={listStyles["list-item"]}>
                                <Plus/>
                                <Link href={"/"+username+"/lists/new"}>New list...</Link>
                            </div>
                            {viewList === 'public' && publicLists.map(list =>(
                                <div className={listStyles["list-item"]} key={list.id}>
                                    <div className={listStyles["item-left"]}>
                                        <input type="checkbox" name="selectedLists" value={list.id} checked={selected.includes(list.id) || list.races.includes(item.id)} onChange={handleSelectChange}
                                        disabled={ list.races.includes(item.id)}/>
                                        <p>{list.name}</p>
                                    </div>                                    
                                    { list.races.includes(item.id) ? <p>Already in the list</p> : <p>{list.races.length} races</p>}
                                </div>
                            )) }
                            {viewList === 'private' && privateLists.map(list =>(
                                <div className={listStyles["list-item"]} key={list.id}>
                                    <div className={listStyles["item-left"]}>
                                        <input type="checkbox" name="selectedLists" value={list.id} checked={selected.includes(list.id) || list.races.includes(item.id)} onChange={handleSelectChange}
                                        disabled={ list.races.includes(item.id)}/>
                                        <p>{list.name}</p>
                                    </div>                                    
                                    { list.races.includes(item.id) ? <p>Already in the list</p> : <p>{list.races.length} races</p>}
                                </div>
                            )) }
                            
                        </div>
                        <div className={listStyles.last}>
                            {error && <p className={styles.error}>{error}</p> }
                            <button type="button" onClick={addToList}>Add</button>
                        </div>
                    </div>
                </div>  
            }
        </>
    )
}