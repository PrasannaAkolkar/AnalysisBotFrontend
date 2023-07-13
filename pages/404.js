import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 style={{textAlign:"center", marginTop:"10%"}}>
                Sorry... This page is not available at the moment
            </h1>
            <img src="/construction.svg" style={{width:"30%", height:"30%", alignSelf:"center"}}>
            </img>
            <button style={{background:"#FFF", width:"10%", color:"blue", border:"none", fontSize:"16px", alignSelf:"center", marginTop:"3%"}} onClick={() =>{
                
                router.push("/")
            }}>
                Home
            </button>
        </div>

    )
}