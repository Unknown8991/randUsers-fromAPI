const API = 'https://randomuser.me/api/?results=9'
class App extends React.Component{
    state = {
        users: []
    }

    handleDataFetch = () =>{
        fetch(API)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error(response.status)
        })
        .then(response => response.json())
        .then(data =>{
            this.setState({
                users: data.results,
            })
        })
    }
    componentDidMount(){
        this.handleDataFetch();
    }
    handleClick = ()=>{
        console.log('ok')
    }
    render(){
        console.log(this.state.users)
        return(
            <div>
                <TitleApp/>
                <header className="text">Amount users: {this.state.users.length}</header>
                <UserList users={this.state.users} />
            </div>
        )
    }
}
const TitleApp = () =>(
    <h1 className="text">The Users</h1>
)
const Users = (props)=>(
    <div className="users">
        <img src={props.picture} alt="Photo user" />
        <div>   
            <p>
                <strong>{props.title}</strong>{`. ${props.name}`} {props.lastName}
            </p>
            <span>Phone: <strong> {props.phone} </strong></span>
        </div>

    </div>
)


const UserList = (props)=>{
    const users = props.users.map(user => (
        <Users
            key = {user.login.uuid}
            title = {user.name.title}
            name = {user.name.first}
            lastName = {user.name.last}
            picture = {user.picture.large}
            phone = {user.phone}
        />
    ))
    return(
        <div>
            <div className="content">{users}</div>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))