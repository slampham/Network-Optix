// What is output?
for(var i=0;i<10;i++){
  setTimeout(function(){
       console.log(i)
  })
}

// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10

// =====================================
// Display contacts on page that can be edited by the users

var data = [
   {
       name: 'James',
       email: 'james@gmail.com'   
   },
   {
       name: 'Jones',
       email: 'jones@gmail.com'   
   }, 
   {
       name: 'Donald',
       email: 'don@yahoo.com' 
   }
]


ReactDOM.render(document.getElementById('root'), App)

function Contact(props) {
 const [name, setName] = useState(props.name)
 const [email, setEmail] = useState(props.email)

 function handleChange(event) {
    const { target } = event 
    
    if (target.name === 'name') {
       setName(target.value)   
    }
   else if (target.name === 'email') {
     setEmail(target.value)
   }
 }
 
 return (
   <>
     <input name='name' value={name} onChange={handleChange}></input>
     <input name='email' value={email} onChange={handleChange}></input>
   </>
 )
}

function App() {
 const contacts = data.map((contact, i) => <Contact name={contact.name} email={contact.email} key={i} />
 
 return (
   <div>
     {contacts}
   </div>
 )
}

export default App

// === Solution

let data = [
 {
   name: 'James',
   email: 'james@gmail.com'   
 },
 {
   name: 'Jones',
   email: 'jones@gmail.com'   
 }, 
 {
   name: 'Donald',
   email: 'don@yahoo.com' 
 }
];

const Contact = (entry) => {
 const [name, setName] = useState(entry.name);
 const [email, setEmail] = useState(entry.email);
 return (
   <div>
     <input onChange={(el) => setName(el.target.value)} value={name} />
     <input onChange={(el) => setEmail(el.target.value)} value={email} />
   </div>
 )
}

function App() {
 return (
   <>{
   data.map((user, i) => (<Contact key={i} {...user} />))
 }</>
 )
}

var root ={
   value:1,
   left:{
       value:2,
       left:{value:4},
       right:{value:5}
   },
   right:{
       value:3,
       right:{value:6}
   }
}


// Create a function to print tree from left to right

// Example output: 4 2 5 1 3 6 

// // ===

// there is a binary tree

//            1

//    2             3

// 4     5              6

// dfs(left) print(val) dfs(right)
// 4 2 
// node = Node()
// 

def dfs(node):
 if not node: return
 dfs(node.left)
 print(node.val)
 dfs(node.right)

printTree = (node) => {
 if (node.left) printTree(node.left)
 if (node.value) console.log(value)
 if (node.right) printTree(node.right)
}

root = Node()
dfs(root)

class Node:
 def __init__(self, left=None, right=None, val):
   self.left = left
   self.right = right
   self.val = val
