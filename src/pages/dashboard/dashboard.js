import { NavLink, Outlet } from "react-router-dom";
import './dashboard.css'
import React,{ useState,useEffect } from "react";
import { Axios } from "../../api/axios";
import { user } from "../../api/api";
import './dashboardcomp/dashboardcomp.css'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import SplitText from '../../blocks/TextAnimations/SplitText/SplitText'
import StorageIcon from '@mui/icons-material/Storage'; 
import { Avatar, Button, Card, CardContent, Typography,CardActions } from "@mui/material";




export default function Dashboard(){
    const [u,setu]=useState("");
    const [dash,setdash]=useState(false);
      const  [NAVIGATION,setNav] = useState([
        {
          kind: 'header',
          title: 'Main items',
        },
        {
          segment: 'dashboard',
          title: 'Dashboard',
          icon: <DashboardIcon />,
        },
        {
          segment: 'dashboard/dbs',
          title: 'My Databases',
          icon:  <StorageIcon /> ,
        },
       
      ]);
    useEffect(()=>{
        try {

             Axios.get('/auth/'+user).then(d=>{
    
                setu(d.data);
                console.log(u)
                if(d.data.authorities.filter((authority,i) => { return authority.authority === 'ADMIN'}).length>0){
    
                    setNav([{
                        kind: 'header',
                        title: 'Main items',
                      },
                      {
                        segment: 'dashboard',
                        title: 'Dashboard',
                        icon: <DashboardIcon />,
                      },
                      {
                        segment: 'dashboard/dbs',
                        title: 'My Databases',
                        icon:  <StorageIcon /> ,
                      },{
                      kind: 'divider',
                    },
                    {
                      kind: 'header',
                      title: 'Admin Panel',
                    },
                    {
                      segment: 'Users',
                      title: 'Users',
                      icon: <BarChartIcon />,
                      children: [
                        {
                          segment: 'add User',
                          title: 'add User',
                          icon: <DescriptionIcon />,
                        },
                        {
                          segment: 'Users',
                          title: 'Users',
                          icon: <DescriptionIcon />,
                        },
                      ],
                    },
                    {
                      segment: 'integrations',
                      title: 'Integrations',
                      icon: <LayersIcon />,
                    },]);  }
            
             })





        } catch (e) { console.log(e)

            window.location.pathname='/login'

        }






    },[])

  
   
      const demoTheme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'class',
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
          },
        },
      });
      const Skeleton = styled('div')(({ theme, height }) => ({
        backgroundColor: theme.palette.action.hover,
        borderRadius: theme.shape.borderRadius,
        height,
        content: '" "',
      }));
      
    return(<AppProvider
        navigation={NAVIGATION}
        branding={{
            logo:      <StorageIcon sx={{marginTop:"7px"}} /> ,
            title: 'ERTODB',
            homeUrl: '/',
          }}
        theme={demoTheme}
       
      >
        <DashboardLayout>
            { window.location.pathname==="/dashboard"?
       
       <div style={{display:"flex",padding:"30px"}}>
       <div>
       <SplitText
       text={"Hello, Welcome Back "+u.name}
       className="text-2xl font-semibold"
       delay={150}
       animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
       animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
       easing="easeOutCubic"
       threshold={0.2}
       rootMargin="-50px"
    
       /><div style={{display:"flex", gap:"30px",marginTop:"30px",flexFlow:"row wrap",width:"100%"}}>
         <Avatar alt={u.name} src="/static/images/avatar/2.jpg" style={{height:'71px',width:'71px'}} />
                
                <div style={{width:"50%"}} ><h4>{u.name}</h4>
                <p style={{color:"grey"}}>
                Welcome to ERTODB this is your dashboard start exploring the platform by creating your first ER Diagram</p>
                  </div>
                  <Card variant="outlined" sx={{width:"auto"}}> <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
      Total Er diagrams Created
      </Typography>
      <Typography variant="h5" component="div">
       50
      </Typography>
    </CardContent>
    <CardActions>
     <NavLink to="/dashboard/dbs"> <Button size="small" variant="contained">Create More</Button></NavLink>
    </CardActions>
  </React.Fragment></Card>
                  
                   </div>
                  <hr></hr>
                
       </div>
       
       </div>
       
       
       
       :<Outlet></Outlet>}
        
        </DashboardLayout>
      </AppProvider>)
//     <div className="dparent">

// <Topbar></Topbar>

// <div style={{display:'flex'}}>
// <Sidebar></Sidebar>


// <Outlet ></Outlet></div>




//     </div>)
}
