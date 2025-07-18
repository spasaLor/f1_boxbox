'use client';
import { createContext, useContext, useState } from 'react';

const RacesContext = createContext();

export function useRaces() {
    return useContext(RacesContext);
}

export function RacesProvider({ children, liked, viewed, logged }) {
    const [likedRaces, setLikedRaces] = useState(liked);
    const [viewedRaces, setViewedRaces] = useState(viewed);
    const [error,setError] = useState('');

    const toggleLike = async(raceId) => {
        if(likedRaces.includes(raceId)){
            const res = await fetch("/api/races/liked",{method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId})
            })
            const json=await res.json();
            if(res.ok){
                const updatedLiked = likedRaces.filter(id=>id !== raceId);
                setLikedRaces(updatedLiked);
            }
            else
                console.log(json.error);
        }
        else{
            const res = await fetch("/api/races/liked",{method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId})
            })
            const json=await res.json();
            if(res.ok){
                setLikedRaces(prev=>[...prev,raceId]);
            }
            else
                console.log(json.error)
        }
    };

    const toggleView = async(raceId) => {
        if(viewedRaces.includes(raceId)){
            const res = await fetch("/api/races/viewed",{method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId})
            })
            const json=await res.json();
            if(res.ok){
                const updatedViewed = viewedRaces.filter(id=>id !== raceId);
                setViewedRaces(updatedViewed);
                setError("");
            }
            else
                setError(json.message);
        }
        else{
            const res = await fetch("/api/races/viewed",{method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId})
            })
            const json=await res.json();
            if(res.ok){
                setViewedRaces(prev=>[...prev,raceId]);
            }
            else
                console.log(json.error)
        }
    };

    return (
        <RacesContext.Provider value={{
            logged,
            error,
            liked: likedRaces,
            viewed: viewedRaces,
            toggleLike,
            toggleView
        }}>
            {children}
        </RacesContext.Provider>
    );
}
