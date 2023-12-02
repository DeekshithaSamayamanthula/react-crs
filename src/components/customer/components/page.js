import Cars from "./cars";
import CustomerDashboard from "./dashboard";

function Page(){
    const [param] = useSearchParams();

    const process = ()=>{
        if(!param.get('page')){
            return  <div>
             <CustomerDashboard />
        </div>
        }
        if(param.get('page') === 'cars'){
             
            return <div>
                <Cars />
            </div>
        }
    }
}
export default Page;