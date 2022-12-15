import { useMutation, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import apiRequests from "./apiRequests"

function Cart(){
    const [produqtebi, setProduqtebi] = useState([])
    const [value, setValue] = useState('')
    const inputRef = useRef()  

    //useQuery გამოიყენება სერვერიდან ინფორმაციის წამოსაღებად და აუცილებლად სჭირდება უნიკალური ქი
    const {data, isLoading} = useQuery("/users?page=1", () => apiRequests('GET', "/users?page=1"))
   
    //სერვერზე ინფორმაციის გადასაგზავნად შეგვიძლია გამოვიყენოთ useMutation. რომელსაც ქის მაგივრად სჭირდება მონაცემი
    const addMutation = useMutation((userInfo) => {
        return apiRequests("POST","/users",{
            userInfo
        })
    })

    const queryClient = useQueryClient() // ყველა სხვაასხვა კონპონენტიდან ქვერი კლიენტზე გვჭირდება წვდომა

    useEffect(() =>{
        if(data){
            setProduqtebi(data)
        }
    },[data]) 

    useEffect(() =>{
        inputRef.current.focus();
    }, [])
    async function damateba(e){
        e.preventDefault();
        const newItems = [
            ...produqtebi,
            {
                first_name: value,
                last_name: ""

            },
        ]
        setProduqtebi(newItems)
        setValue("")
        // იქ სადაც მანამდე ვიძახებდით apirequestს, ახლა გამოვიძახებთ მუტაციას, შესაბამისი მეთოით
        // მეთოდები განსხვავდება, მაგრამ ერთ ერთი უპირატესობა რომელიც ამ კონკრეტულს გააჩნია, არის ის, რომ 
        // ასინქრონულად წაიღებს მონაცმეებს, ჩვენი ჩარევის გარეშე
        await addMutation.mutateAsync(value)
        queryClient.invalidateQueries("/users?page=1") // ახალი ინფორმაციის დამატების შემდეგ თავიდან გადაამოწმებს მასივს
    }
    function removeItem(itemId){
        const newItems = produqtebi.filter(item => item.id !== itemId)
        setProduqtebi(newItems);
    }
    return <div  className="friends">
        <form action ="" onSubmit={damateba}>
            <input 
            type="text" 
            value={value} 
            onChange={e => setValue(e.target.value)}
            ref ={inputRef}
            />
        </form>
        {
            isLoading ? <div className="loader-container"></div> : (
            <ul> 
                {
                produqtebi.map(item =>( 
                    <li key={item.id}  > 
                    {item.first_name+ " "+ item.last_name}
                    <button onClick={() => removeItem(item.id)}> Remove</button> 
                    </li>   
                ))
                }
            </ul>
            )
        }
         
    </div>
}

export default Cart;
