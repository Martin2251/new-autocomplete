
import './App.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import './custom.css';

function App() {
  const [users, setUsers] = useState([]);
  const [ text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([])

  useEffect (() => {
const loadUsers = async() => {
  const response = await axios.get("https://regres.in/api/users");

  setUsers(response.data.data)
}
loadUsers();
  }, [])
const onSuggestHandler = (text) => {
  setText(text);
  setSuggestions([]);
}
  const onChangeHandler = (text) => {
    let matches=[]
if(text.length>0){
  matches= users.filter(user=>{
    const regex = new RegExp(`${text}`, "gi");
    return user.email.match(regex)
  })

}
setSuggestions(matches)
    setText(text)
  }
  return (
    <div className="container">
      
      <input type="text" className='col-md-12' style={{marginTop:10}}
      onChange={e => onChangeHandler(e.target.value)}
      value={text}
      onBlur={() => {
        setTimeout(() => {setSuggestions([])
        }, 100);
      }

      }
      />
      {suggestions && suggestions.map((suggestion,i)=>
      <div key={i} className="suggestion col-md-12 justify-content-md-center"
      onClick={()=>onSuggestHandler(suggestion.email)}
      >{suggestions.email}</div>
      )}
    </div>
  );
}

export default App;
