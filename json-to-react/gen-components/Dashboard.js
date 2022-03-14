import HomeBtn from './HomeBtn';
import LogoutBtn from './LogoutBtn';

const Dashboard = ({ userData }) => {
    const logout = () => {
        console.log();
    };

    return (
        <div className="main-cont" style={____}>
            <HomeBtn />
            <LogoutBtn logout={logout} />
        </div>
    );
};

export default Dashboard;
